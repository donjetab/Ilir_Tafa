// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.SITE_URL ?? 'https://donjetab.github.io/';
const base = process.env.BASE_PATH ?? '/Ilir_Tafa/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  devToolbar: { enabled: false },
  i18n: {
    locales: ['sq', 'en', 'bs'],
    defaultLocale: 'sq',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap({
    filter: (page) => {
      const path = new URL(page).pathname.replace(base, '/');
      return !/^\/(?:about|works|news|gallery)(?:\/|$)|^\/en\/about(?:\/|$)|^\/bs\/(?:about|works|news|gallery)(?:\/|$)/.test(path);
    },
    i18n: {
      defaultLocale: 'sq',
      locales: { sq: 'sq-AL', en: 'en', bs: 'bs-BA' },
    },
  })],

  vite: {
    plugins: [tailwindcss()],
  },
});
