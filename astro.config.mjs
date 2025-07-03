// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  env: {
    schema: {
      SHOW_BUY_BUTTON: envField.boolean({ default: false, context: 'server', access: 'public' }),
      SCORE_API_ENDPOINT: envField.string({ context: 'server', access: 'public' })
    }
  },
  output:'server'
});