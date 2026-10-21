import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 默认基座路径为 GitHub Pages 子路径；
// 宝塔等自有服务器根路径部署时用 CLI 参数覆盖：pnpm build:root
export default defineConfig({
	base: '/.github/',

	plugins: [vue()],

	resolve: {
		alias: {
			'@': '/src'
		}
	}
})
