// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover' // Solo prefetch en hover explícito
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@lib': '/src/lib',
        '@assets': '/src/assets',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@types': '/src/types'
      }
    }
  },

  integrations: [react(), mdx()]
});