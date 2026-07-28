import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://carinaruut.github.io',
  base: '/portfolio',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
