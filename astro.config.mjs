// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://donjetab.github.io/',
  base: '/Ilir_Tafa/',
  devToolbar: { enabled: false },
  i18n: {
    locales: ['sq', 'en', 'bs'],
    defaultLocale: 'sq',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap({
    filter: (page) => !/\/Ilir_Tafa\/(?:about|works|news|gallery)(?:\/|$)|\/Ilir_Tafa\/en\/about(?:\/|$)|\/Ilir_Tafa\/bs\/(?:about|works|news|gallery)(?:\/|$)/.test(new URL(page).pathname),
    i18n: {
      defaultLocale: 'sq',
      locales: { sq: 'sq-AL', en: 'en', bs: 'bs-BA' },
    },
  })],

  vite: {
    plugins: [tailwindcss()],
  },
});
