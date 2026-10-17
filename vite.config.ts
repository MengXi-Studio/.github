import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	base: '/.github/',

	plugins: [vue()],

	resolve: {
		alias: {
			'@': '/src'
		}
	}
})
