import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: ['test/**/*.test.ts'],
  nodeResolve: true,
  plugins: [esbuildPlugin({ ts: true, target: 'es2022' })],
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
  testFramework: { config: { ui: 'bdd', timeout: 5000 } },
  coverageConfig: {
    threshold: { statements: 80, branches: 70, functions: 80, lines: 80 },
  },
};
