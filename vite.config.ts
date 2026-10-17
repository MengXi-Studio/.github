import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { projects } from './src/data/projects'

export default defineConfig({
  base: '/.github/',
  publicDir: 'images',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        ...Object.fromEntries(
          projects.map((p) => [`projects/${p.slug}`, `projects/${p.slug}.html`]),
        ),
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
