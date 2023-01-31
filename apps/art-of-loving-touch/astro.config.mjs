import { defineConfig } from 'astro/config';

// https://astro.build/config
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import mkcert from 'vite-plugin-mkcert';

// https://astro.build/config
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind({
    config: {
      applyBaseStyles: false
    }
  })],
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [mkcert()],
    server: {
      https: true
    }
  }
});