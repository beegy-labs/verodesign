import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readdirSync, statSync } from 'node:fs';

const componentsDir = resolve(__dirname, 'src/components');
const componentEntries: Record<string, string> = {};
for (const name of readdirSync(componentsDir)) {
  const dir = resolve(componentsDir, name);
  if (!statSync(dir).isDirectory()) continue;
  componentEntries[`components/${name}/index`] = resolve(dir, 'index.ts');
  componentEntries[`components/${name}/define`] = resolve(dir, 'define.ts');
  const iconsDir = resolve(dir, 'icons');
  if (!statSync(dir).isDirectory()) continue;
  try {
    for (const file of readdirSync(iconsDir)) {
      if (!file.endsWith('.ts')) continue;
      componentEntries[`components/${name}/icons/${file.replace(/\.ts$/, '')}`] = resolve(iconsDir, file);
    }
  } catch {
    // component has no nested registry modules
  }
}

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    target: 'es2022',
    sourcemap: false,
    minify: 'esbuild',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        ...componentEntries,
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        /^@zag-js\//,
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
});
