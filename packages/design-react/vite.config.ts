import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readdirSync, statSync } from 'node:fs';

const componentsDir = resolve(__dirname, 'src/components');
const componentEntries: Record<string, string> = {};
for (const file of readdirSync(componentsDir)) {
  if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue;
  if (file.endsWith('.d.ts')) continue;
  const name = file.replace(/\.tsx?$/, '');
  componentEntries[`components/${name}`] = resolve(componentsDir, file);
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
        'react',
        'react/jsx-runtime',
        /^@lit\//,
        /^lit($|\/)/,
        /^@verobee\//,
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
});
