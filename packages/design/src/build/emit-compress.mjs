import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { brotliCompressSync, constants } from 'node:zlib';

const DIST = new URL('../../dist/', import.meta.url).pathname;

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
  for (const file of cssFiles) {
    const buf = await readFile(file);
    totalRaw += buf.length;
    const br = brotliCompressSync(buf, {
      params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
    });
    await writeFile(file + '.br', br);
    totalBr += br.length;
  }
  return { count: cssFiles.length, totalRaw, totalBr };
}
