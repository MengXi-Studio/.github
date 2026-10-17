import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 项目站点子路径：mengxi-studio.github.io/.github/
  base: '/.github/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
