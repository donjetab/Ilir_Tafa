// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://donjetab.github.io/',
  base: '/Ilir_Tafa/',
  i18n: {
    locales: ['sq', 'en', 'bs'],
    defaultLocale: 'sq',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [mdx(), sitemap({
    i18n: {
      defaultLocale: 'sq',
      locales: { sq: 'sq-AL', en: 'en', bs: 'bs-BA' },
    },
  })],

  vite: {
    plugins: [tailwindcss()],
  },
});
