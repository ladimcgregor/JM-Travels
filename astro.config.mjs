// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// TODO: replace with the live production domain before launch (used for sitemap + canonical URLs).
const SITE_URL = 'https://www.jmtravels.com';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    remotePatterns: [{ protocol: 'https' }],
  },
  prefetch: true,
});
