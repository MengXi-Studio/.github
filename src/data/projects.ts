export type Platform = 'uni-app' | 'uni-app x' | '通用'

export interface NpmInfo {
  /** npm 包名 */
  pkg: string
  /** 最新版本 */
  version?: string
  /** 最近发布日期 */
  date?: string
  /** 月下载量 */
  downloads?: number
}

export interface Project {
  slug: string
  name: string
  platform: Platform
  tagline: string
  description: string
  features: string[]
  /** 安装命令（无 npm 包的项目不展示终端块） */
  install?: string
  /** 安装补充说明 */
  installNote?: string
  /** 最小用法示例 */
  usage?: string
  usageLang?: string
  useCases: string[]
  repo: string
  docs?: string
  npm?: NpmInfo
  stars: number
}

export const platformLabel: Record<Platform, string> = {
  'uni-app': 'uni-app',
  'uni-app x': 'uni-app x',
  '通用': '通用工程化',
}

export const platformClass: Record<Platform, string> = {
  'uni-app': 'uni-app',
  'uni-app x': 'uni-app-x',
  '通用': 'common',
}

export const projects: Project[] = [
  {
    slug: 'uni-router',
    name: 'uni-router',
    platform: 'uni-app',
    tagline: '为 uni-app 提供类似 vue-router 风格的路由管理系统',
    description:
      '面向 uni-app（Vue3）的路由管理库，API 对齐 vue-router。提供完整守卫链、返回拦截与冷启动守卫，重复导航自动拒绝、并发导航自动排队。配合 @meng-xi/vite-plugin 可从 pages.json 自动生成路由配置与 TypeScript 类型声明。',
    features: [
      'vue-router 风格 API（push / replace / relaunch / back），根据 meta.isTab 自动切换 switchTab',
      '完整路由守卫（beforeEach / beforeResolve / afterEach / beforeEnter 等），支持守卫超时保护',
      '返回拦截：App 物理返回键、导航栏返回、H5 浏览器后退 / 手势均可被守卫拦截',
      '冷启动守卫 guardRoute()：H5 URL、小程序场景值、App deeplink 直达页面时补执行守卫链',
      '插件架构：Params / Animation / Channel / Interceptor 四类插件按需注册',
      '页面间通信 usePageChannel()、声明式导航 RouterLink 与 TabBar 组件、复杂参数 storage 持久化',
    ],
    install: 'npm install @meng-xi/uni-router',
    installNote: '推荐配合 @meng-xi/vite-plugin 使用，可从 pages.json 自动生成路由配置与类型声明。',
    usage: `const router = createRouter({
  routes,
  plugins: [ParamsPlugin, ChannelPlugin, InterceptorPlugin],
  interceptUniApi: true,
})

await router.push({ name: 'about' })

router.beforeEach((to, from) => {
  if (to.meta.requireAuth && !isLoggedIn()) return { name: 'login' }
})`,
    usageLang: 'TypeScript',
    useCases: [
      '登录鉴权重定向：beforeEach 中校验登录态并重定向登录页',
      '拦截物理返回 / 浏览器后退，弹出确认或执行自定义逻辑',
      'H5 直达与 App deeplink 冷启动时补执行完整守卫链',
    ],
    repo: 'https://github.com/MengXi-Studio/uni-router',
    docs: 'https://mengxi-studio.github.io/uni-router/',
    npm: { pkg: '@meng-xi/uni-router', version: '2.7.1', date: '2026-08-31', downloads: 213 },
    stars: 10,
  },
  {
    slug: 'unix-router',
    name: 'unix-router',
    platform: 'uni-app x',
    tagline: '为 uni-app x 提供类似 vue-router 风格的路由管理系统',
    description:
      'UTS 编写的 uni-app x 路由管理库，UTS 源码分发（web / 小程序编译为 JS，Android 编译为 Kotlin，iOS 编译为 Swift）。API 与守卫体系对齐 vue-router，另提供可选的基于文件的路由生成构建期工具。',
    features: [
      'vue-router 风格 API，meta.isTab 自动 switchTab，重复导航拒绝、并发导航排队',
      '完整守卫链 + 冷启动守卫 guardRoute()，守卫超时保护与重定向深度上限',
      '基于文件的路由生成（可选 Vite 插件）：defineUniPage 宏或 route-config 块自动生成 pages.json 与路由表',
      'ParamsPlugin 跨页传参不暴露明文键名；AnimationPlugin 导航窗口动画（App 原生动画 / H5 WAAPI）',
      'useLink() 声明式导航 + RouterLink 组件，currentRoute 响应式自动同步',
      'interceptUniApi 拦截 uni.navigateTo 等原生导航，统一转入守卫链',
    ],
    install: 'npm install @meng-xi/unix-router',
    usage: `export const router = createRouter({ routes, strict: true })

await router.push({ name: 'about', query: new Map([['a', '1']]) })

await router.back(2) // 返回两级`,
    usageLang: 'UTS',
    useCases: [
      'uni-app x 项目需要 vue-router 心智的路由与守卫体系',
      '需要拦截返回键 / 原生导航 API 并统一纳入守卫链',
    ],
    repo: 'https://github.com/MengXi-Studio/unix-router',
    docs: 'https://mengxi-studio.github.io/unix-router/',
    npm: { pkg: '@meng-xi/unix-router', version: '0.8.0', date: '2026-09-27', downloads: 1153 },
    stars: 3,
  },
  {
    slug: 'unix-utils',
    name: 'unix-utils',
    platform: 'uni-app x',
    tagline: '为 uni-app x 提供便利工具的集合',
    description:
      'uni-app x UTS 工具集，当前以跨端 Toast 为核心能力。覆盖 Android / iOS / Web / 微信 / 鸿蒙五端，按端自动选择混合通道，业务侧零配置。参数与 uni.showToast 完全同构，迁移零成本。',
    features: [
      '全端兼容：Android / iOS / Web / 微信 / 鸿蒙五端覆盖，分端混合通道自动分发',
      'App 端 UTS 直挂系统窗口，position / warning / mask 全生效，失败自动降级 uni.showToast',
      'Web 端 DOM 单例自绘，无平台截断；icon 超集扩展 warning',
      '双轨 API：回调式 showToast + Promise 式 showToastAsync + 语义化快捷方法',
      '结构化降级：ToastFail（errCode / errSubject / param / platform）经 fail 回调留痕可感知',
      '全局默认配置 configureToast，项目级预设 duration / icon / mask',
    ],
    install: 'npm install @meng-xi/unix-utils',
    installNote:
      '使用前将包复制到 uni_modules 目录（mkdir -p uni_modules && cp -R node_modules/@meng-xi/unix-utils uni_modules/unix-utils），另支持 HBuilderX 插件市场导入。',
    usage: `import { showToast } from '@/uni_modules/unix-utils'

showToast({ title: '保存成功', icon: 'success', duration: 2000 })`,
    usageLang: 'UTS',
    useCases: ['uni-app x 项目统一各端 Toast 行为与降级策略'],
    repo: 'https://github.com/MengXi-Studio/unix-utils',
    docs: 'https://mengxi-studio.github.io/unix-utils/',
    npm: { pkg: '@meng-xi/unix-utils', version: '0.1.0', date: '2026-10-09', downloads: 175 },
    stars: 1,
  },
  {
    slug: 'unix-request',
    name: 'unix-request',
    platform: 'uni-app x',
    tagline: '为 uni-app x 提供功能完善的网络请求库',
    description:
      'axios 心智的 uni-app x 网络请求库，底层唯一依赖 uni.request，不重造网络栈。拦截器、transform、取消、错误码心智完全对齐 axios，多端发布时 URL 编码与错误分类由库内确定性实现。',
    features: [
      'axios 心智开箱即用：request 主入口 + get / post / put / patch / del / head / options 七种快捷方法，createRequest 多实例隔离',
      '统一错误体系：RequestError 收敛 8 类错误码，原生 errCode 原值透传，config 与 response 原文挂载',
      '泛型静态标注：request<T> 返回 Promise<ResponseResult<T>>，res.data 类型直达',
      '确定性 URL 处理：baseURL 拼接、params 与 query 合并统一编码、header 三级浅合并',
      '请求 / 响应拦截器（多枚有序、可 eject）；createCancelSource 确定性取消全部进行中请求',
      'onTask 逃生舱透出原生 RequestTask，原生能力参数全量透传不抹平',
    ],
    install: 'npm install @meng-xi/unix-request',
    installNote:
      '使用前将包复制到 uni_modules 目录（cp -R node_modules/@meng-xi/unix-request uni_modules/mx-request）。',
    usage: `import { request } from '@/uni_modules/mx-request'

request<UTSJSONObject>({ url: '/api/get', method: 'GET', params: { page: 1 } })
  .then((res) => console.log(res.statusCode, res.data))`,
    usageLang: 'UTS',
    useCases: [
      'uni-app x 多端项目统一网络层',
      '有 axios 使用经验的团队零成本上手',
    ],
    repo: 'https://github.com/MengXi-Studio/unix-request',
    docs: 'https://mengxi-studio.github.io/unix-request/',
    npm: { pkg: '@meng-xi/unix-request', version: '0.1.0', date: '2026-10-13', downloads: 0 },
    stars: 0,
  },
  {
    slug: 'uni-ui',
    name: 'uni-ui',
    platform: 'uni-app',
    tagline: '轻量级、高可定制的 uni-app UI 组件库',
    description:
      '基于 Vue 3 + TypeScript 的 uni-app 组件库，参照 Vant 4 规范划分组件，统一 mx- 前缀，覆盖基础 / 表单 / 反馈 / 展示 / 导航 / 业务六大类。Easycom 按需自动导入，SCSS 变量 + CSS 变量双层主题，pnpm monorepo 管理 core / docs / playground / uni-app 四子包。',
    features: [
      'Vue 3 + TypeScript，Composition API 完整类型推导',
      'Easycom 自动导入，按需加载无需手动注册',
      '主题定制：SCSS 变量 + CSS 变量（--mx-*）双层，支持运行时覆盖',
      '多端兼容：H5、微信小程序、支付宝小程序、App',
      '组件齐全：按 Vant 4 六大分类，含 Field / Form / Picker / Calendar / Uploader、Toast / Dialog / Tabs / NavBar / Card 等',
    ],
    install: 'npm install @mengxi/uni-ui',
    installNote:
      '在 pages.json 中配置 easycom 自动导入：{"easycom": {"custom": {"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"}}}。',
    usage: `<mx-button type="primary">主要按钮</mx-button>`,
    usageLang: 'Vue',
    useCases: ['uni-app 项目需要 Vant 风格的跨端组件库'],
    repo: 'https://github.com/MengXi-Studio/uni-ui',
    npm: { pkg: '@mengxi/uni-ui' },
    stars: 0,
  },
  {
    slug: 'uni-template-vue3',
    name: 'uni-template-vue3',
    platform: 'uni-app',
    tagline: 'mengxi-uniapp：基于 Uniapp + Vue3 的多端项目模板',
    description:
      'package 名为 mengxi-uniapp 的 uni-app + Vue3 + TypeScript + Vite 项目模板，预集成 @meng-xi/uni-router、@meng-xi/vite-plugin、Pinia（含持久化插件）、vue-i18n、@vueuse/core、dayjs、lodash 等完整技术栈，开箱即用。',
    features: [
      '全平台脚本覆盖：App、H5（含 SSR）、微信 / 支付宝 / 百度 / 京东 / 快手 / 飞书 / QQ / 头条 / 小红书小程序、华为 / 联盟快应用',
      '预集成 @meng-xi/uni-router 与 @meng-xi/vite-plugin',
      'Pinia + pinia-plugin-persistedstate 状态管理与持久化',
      'vue-i18n 国际化、@vueuse/core 组合式工具、dayjs / lodash',
      'TypeScript + Sass 工程化：vue-tsc 类型检查、Prettier 规范',
    ],
    useCases: ['作为 uni-app 多端项目的起始模板，快速启动开发'],
    repo: 'https://github.com/MengXi-Studio/uni-template-vue3',
    stars: 0,
  },
  {
    slug: 'create-uni-app',
    name: 'create-uni-app',
    platform: 'uni-app',
    tagline: '基于 uni-app 的交互式脚手架 CLI，按需生成项目与可选功能',
    description:
      '基于 uni-app + Vue3 + Vite 的交互式脚手架 CLI。通过命令行对话按需生成基础项目与可选能力，只产出选中的内容，不携带多余文件与依赖。',
    features: [
      '交互式创建：项目名 → 脚本语言 → CSS 预处理器 → 状态管理 → 路由方案 → 目标平台 → 可选功能 → 包管理器一步到位',
      '多平台按需：支持全部 uni-app 平台，提供「全部端 / 小程序 / 快应用」分组快捷勾选',
      'TS / JS 可选，自动适配 tsconfig / jsconfig 与 Vite 配置',
      '内置主题（可选）：紫 / 蓝 / 绿 / 橙四色板，兼容 Sass / Less / Stylus / 原生 CSS',
      '状态管理 Pinia / Vuex 二选一可选持久化；路由方案 uni-router 等互斥可选，含守卫示例',
      '可选功能：请求封装 + 登录鉴权、uni-ui 组件库（easycom）；配套 create 建页、info 诊断、config 模板源命令',
    ],
    install: 'npm install -g @meng-xi/create-uni-app',
    installNote: '也可以免安装直接使用：npx @meng-xi/create-uni-app my-app',
    usage: `create-uni-app my-app`,
    usageLang: 'Shell',
    useCases: ['快速初始化按需组装技术栈的 uni-app 项目'],
    repo: 'https://github.com/MengXi-Studio/create-uni-app',
    docs: 'https://mengxi-studio.github.io/create-uni-app/',
    npm: { pkg: '@meng-xi/create-uni-app', version: '1.2.1', date: '2026-09-20', downloads: 231 },
    stars: 2,
  },
  {
    slug: 'vite-plugin',
    name: 'vite-plugin',
    platform: '通用',
    tagline: '为 Vite 提供实用插件的工具包，也是完整的插件开发框架',
    description:
      '提供 17 个实用 Vite 插件，按 compress / generate / inject / analyze / copy / guard / proxy 七组组织（类似 Lodash），支持分组或单独子路径导入。同时导出 BasePlugin / Logger / Validator 等组件构成插件开发框架，并内置 14 大通用工具模块。',
    features: [
      '17 个开箱即用插件：自动导入、构建进度、产物分析与压缩、文件复制、环境变量校验、路由生成、页面配置生成、版本管理、HTML 注入、图标管理、全局 Loading、图片优化、开发代理等',
      'uni-app 专项：generateUni 一条流水线完成「扫描页面 → pages.json → 路由配置」，等价 generatePages + generateRouter 连用',
      '插件开发框架：BasePlugin、createPluginFactory、Logger、链式 Validator',
      '通用工具库：14 大 Common 工具模块（fs / format / html / concurrency 等），支持子路径按需导入',
      '类型安全：完整 TypeScript 类型定义与配置验证器；按需导出减少打包体积',
    ],
    install: 'npm install -D @meng-xi/vite-plugin',
    usage: `import { autoImport, compressAssets, generateUni } from '@meng-xi/vite-plugin'

export default defineConfig({
  plugins: [
    autoImport({ imports: ['vue', 'vue-router'] }),
    compressAssets({ algorithm: 'gzip' }),
    generateUni({ pages: { pagesDir: 'src/pages' }, router: { dts: true } }),
  ],
})`,
    usageLang: 'TypeScript',
    useCases: [
      'uni-app 项目自动生成 pages.json 与路由配置 / 类型声明',
      'Vite 项目构建增强（压缩、体积分析、环境变量校验等）',
    ],
    repo: 'https://github.com/MengXi-Studio/vite-plugin',
    docs: 'https://mengxi-studio.github.io/vite-plugin/',
    npm: { pkg: '@meng-xi/vite-plugin', version: '1.4.1', date: '2026-09-16', downloads: 435 },
    stars: 5,
  },
]

export const totalDownloads = projects.reduce((sum, p) => sum + (p.npm?.downloads ?? 0), 0)

export const npmCount = projects.filter((p) => p.npm).length

export const docSites = projects.filter((p) => p.docs).length
