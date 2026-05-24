import { readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

import viteConfig from './vite.config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = resolve(__dirname, '../design-elements/dist/components/icon/icons');

const iconRegistryAliases = readdirSync(iconsDir)
  .filter((file) => file.endsWith('.js'))
  .reduce(
    (acc, file) => {
      const name = file.replace(/\.js$/, '');
      acc[`@verobee/design-elements/icon-registry/${name}`] = resolve(iconsDir, file);
      return acc;
    },
    {} as Record<string, string>,
  );

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        ...iconRegistryAliases,
      },
    },
    test: {
      environment: 'jsdom',
    },
  }),
);
