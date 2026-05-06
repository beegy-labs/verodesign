import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Astro config for verodesign showcase site (design.verobee.com).
// Native web component support means <vds-*> tags render directly in MDX.
export default defineConfig({
  site: 'https://design.verobee.com',
  integrations: [mdx()],
  vite: {
    optimizeDeps: {
      // Lit web components are imported as side-effect modules; let Vite
      // include them in the dev bundle.
      include: ['@verobee/design-elements', 'lit'],
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
