import { readFileSync, writeFileSync, statSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';
const CSS_IMPORT_REWRITES = [
    { from: /@import\s+['"]\.\.\/styles\/verodesign\/tokens\.property\.css['"];?/g, to: `@import '@verobee/spec/dist/tokens/semantic/core.json';` },
    { from: /@import\s+['"]\.\.\/styles\/verodesign\/reset\.css['"];?/g, to: `@import '@verobee/primitive/dist/css/reset.css';` },
    { from: /@import\s+['"]\.\.\/styles\/verodesign\/core\.css['"];?/g, to: `@import '@verobee/primitive/dist/css/core.css';` },
    { from: /@import\s+['"]\.\.\/styles\/verodesign\/theme\.css['"];?/g, to: `@import '@verobee/theme-verobase/css/theme.css';` },
    { from: /@import\s+['"]\.\.\/styles\/verodesign\/utilities\.css['"];?/g, to: `@import '@verobee/utilities/css/full.css';` },
    { from: /@import\s+['"]\.\.\/styles\/verodesign\/state-variants\.css['"];?/g, to: `@import '@verobee/utilities/css/state-variants.css';` },
    { from: /@import\s+['"]\.\.\/styles\/verodesign\/responsive\.css['"];?/g, to: `@import '@verobee/utilities/css/responsive.css';` },
];
const JS_IMPORT_REWRITES = [
    { from: /from\s+['"]@verobee\/design\/css\/(.+?)['"]/g, to: (_m, p) => `from '@verobee/utilities/css/${p}'` },
    { from: /from\s+['"]@verobee\/design\/utilities\/(.+?)['"]/g, to: (_m, p) => `from '@verobee/utilities/css/${p}'` },
];
function walk(dir, exts, out = []) {
    for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        if (name === 'node_modules' || name === '.next' || name === 'dist' || name === '.git')
            continue;
        const stat = statSync(full);
        if (stat.isDirectory())
            walk(full, exts, out);
        else if (exts.includes(extname(name)))
            out.push(full);
    }
    return out;
}
export async function transform(targetDir, { dry = false } = {}) {
    const cssFiles = walk(targetDir, ['.css', '.scss', '.pcss']);
    const tsFiles = walk(targetDir, ['.ts', '.tsx', '.js', '.jsx', '.mjs']);
    let totalChanges = 0;
    for (const file of cssFiles) {
        let text = readFileSync(file, 'utf-8');
        let changed = false;
        for (const { from, to } of CSS_IMPORT_REWRITES) {
            const next = text.replace(from, to);
            if (next !== text) {
                text = next;
                changed = true;
                totalChanges += 1;
            }
        }
        if (changed && !dry)
            writeFileSync(file, text);
        if (changed)
            console.log(`  ${file}`);
    }
    for (const file of tsFiles) {
        let text = readFileSync(file, 'utf-8');
        let changed = false;
        for (const { from, to } of JS_IMPORT_REWRITES) {
            const next = text.replace(from, to);
            if (next !== text) {
                text = next;
                changed = true;
                totalChanges += 1;
            }
        }
        if (changed && !dry)
            writeFileSync(file, text);
        if (changed)
            console.log(`  ${file}`);
    }
    console.log(`\n${dry ? '[DRY RUN] ' : ''}${totalChanges} rewrites in ${targetDir}`);
    return totalChanges;
}
