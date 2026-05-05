import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { availableParallelism } from 'node:os';
import { promisify } from 'node:util';
import { brotliCompress, constants } from 'node:zlib';

const DIST = new URL('../../dist/', import.meta.url).pathname;
const brotli = promisify(brotliCompress);

async function walkCss(dir) {
  const out = [];
  for (const ent of await readdir(dir)) {
    const p = join(dir, ent);
    const s = await stat(p);
    if (s.isDirectory()) {
      out.push(...(await walkCss(p)));
    } else if (ent.endsWith('.css')) {
      out.push(p);
    }
  }
  return out;
}

// Emit Brotli-11 precompressed `.br` sibling for every `.css` in dist.
// CDNs (Vercel, Cloudflare Pages, Netlify) auto-detect and serve when
// `Accept-Encoding: br` present. Architecture: docs/llm/build/optimization.md
// § Technique 8.
export async function emitCompress() {
  const cssFiles = await walkCss(DIST);
  let totalRaw = 0;
  let totalBr = 0;

  const requestedConcurrency = Number.parseInt(process.env.VDS_BROTLI_CONCURRENCY ?? '', 10);
  const concurrency = Number.isFinite(requestedConcurrency) && requestedConcurrency > 0
    ? requestedConcurrency
    : Math.max(1, Math.min(availableParallelism(), 8));

  let cursor = 0;
  async function worker() {
    while (cursor < cssFiles.length) {
      const file = cssFiles[cursor++];
      const buf = await readFile(file);
      const br = await brotli(buf, {
        params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
      });
      await writeFile(file + '.br', br);
      totalRaw += buf.length;
      totalBr += br.length;
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, cssFiles.length) }, () => worker()));

  return { count: cssFiles.length, totalRaw, totalBr, concurrency };
}
