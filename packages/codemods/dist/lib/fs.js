import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
const SKIP_DIRS = new Set(['.git', '.next', '.turbo', 'coverage', 'dist', 'node_modules']);
export async function walk(dir, exts, out = []) {
    for (const name of await readdir(dir)) {
        if (SKIP_DIRS.has(name))
            continue;
        const full = join(dir, name);
        const entry = await stat(full);
        if (entry.isDirectory()) {
            await walk(full, exts, out);
            continue;
        }
        if (!exts || exts.includes(extname(name)))
            out.push(full);
    }
    return out;
}
export async function rewriteFile(file, mutate, dry = false) {
    const before = await readFile(file, 'utf8');
    const after = await mutate(before);
    if (after === before)
        return false;
    if (!dry)
        await writeFile(file, after, 'utf8');
    return true;
}
