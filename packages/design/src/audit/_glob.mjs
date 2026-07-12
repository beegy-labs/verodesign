import { readdirSync } from 'node:fs';

/**
 * Minimal Node 20-compatible stand-in for `fs.globSync`, which was only added
 * to `node:fs` in Node 22. This package declares `engines.node >= 20` and CI
 * pins Node 20, so importing `globSync` from `node:fs` hard-fails at load time.
 *
 * Supports the single-directory `dir/*.ext` glob shape used by the design
 * audits and returns cwd-relative POSIX paths, matching the fs.globSync
 * contract the callers rely on (they then `.sort()` and join against ROOT).
 */
export function globSync(pattern, { cwd } = {}) {
  const slash = pattern.lastIndexOf('/');
  const dir = slash === -1 ? '.' : pattern.slice(0, slash);
  const filename = pattern.slice(slash + 1);
  if (!filename.startsWith('*')) {
    throw new Error(`_glob: unsupported pattern "${pattern}" (only dir/*.ext supported)`);
  }
  const ext = filename.slice(1);
  const base = cwd ? `${cwd}/${dir}` : dir;
  let entries;
  try {
    entries = readdirSync(base);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
  return entries.filter((f) => f.endsWith(ext)).map((f) => `${dir}/${f}`);
}
