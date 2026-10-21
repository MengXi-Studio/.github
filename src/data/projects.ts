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
    npm: { pkg: '@meng-xi/uni-router', version: '2.7.1', date: '2026-08-31', downloads: 160 },
    stars: 11,
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
    npm: { pkg: '@meng-xi/unix-router', version: '0.8.0', date: '2026-09-27', downloads: 799 },
    stars: 3,
  },
  {
    slug: 'unix-utils',
    name: 'unix-utils',
    platform: 'uni-app x',
    tagline: '为 uni-app x 提供便利工具的集合',
    description:
      'uni-app x UTS 工具集，含 toast 与 modal 两大模块：与 uni.showToast / uni.showModal 参数完全同构，迁移零成本。App 端 UTS 直挂系统窗口（Android WindowManager / iOS UIWindow），Web 端 DOM 单例自绘，微信 / 鸿蒙原生通道自动降级并结构化留痕，一套 API 全端覆盖。',
    features: [
      'toast · App 端 UTS 直挂系统窗口：Android WindowManager / iOS UIWindow 免注册挂窗，position / warning / mask / 精确 duration 全生效，挂窗失败自动降级 uni.showToast',
      'toast · Web 端 DOM 单例自绘：position / warning / 无平台截断全生效；参数与 uni.showToast 完全同构，迁移零成本',
      'toast · 双轨 API：回调式 showToast + Promise 式 showToastAsync，语义化快捷 showToastSuccess / showToastError / showToastInfo，hideToast 可靠隐藏',
      'toast · 全局默认与结构化降级：configureToast 项目级预设 duration / icon / mask；ToastFail（errCode / errSubject / param / platform）经 fail 回调留痕可过滤',
      'modal · 参数完全对齐 uni.showModal：返回值恒定，ModalResult 的 confirm / cancel 恒存在且互斥，editable 场景 content 携带用户输入',
      'modal · App 端直挂系统窗口自绘（v0.2.0 起不再走 uni.showModal 原生通道）：蒙层点击不关闭、Android 返回键取消语义、连续调用后调替换前调，弹窗表现跨端一致',
      'modal · editable 真实输入框与颜色归一化：正文超屏高 60% 自动限高滚动；#RGB / #RRGGBB / #RRGGBBAA 校验，alpha 全生效，微信 / 鸿蒙自动剥离留痕；受限端按钮文案超 4 字符自动截断',
      'modal · Promise 式与全局默认：showModalAsync 点取消不算失败、showModalAlert 单按钮 alert 语义、configureModal 预设按钮文案与颜色；ModalFail / ModalResult 类型对外导出',
    ],
    install: 'npm install @meng-xi/unix-utils',
    installNote:
      '使用前将包复制到 uni_modules 目录（mkdir -p uni_modules && cp -R node_modules/@meng-xi/unix-utils uni_modules/unix-utils），另支持 HBuilderX 插件市场导入。',
    usage: `// ─── 发出第一条 toast ───────────────────────────
import { showToast } from '@/uni_modules/unix-utils'

// 与 uni.showToast 同构，迁移零成本
showToast({
  title: '保存成功',
  icon: 'success',
  duration: 2000,
})

// ─── Promise 式与语义化快捷 ─────────────────────
import {
  showToastAsync,
  showToastSuccess,
  showToastError,
  showToastInfo,
  hideToast,
} from '@/uni_modules/unix-utils'

// Promise 式：失败 reject ToastFail 结构的 JSON 字符串（全端统一，JSON.parse 还原）
try {
  await showToastAsync({ title: '加载中', icon: 'loading' })
} catch (err) {
  const fail = JSON.parse<ToastFail>(err as string)
  if (fail != null) console.error(fail.errCode, fail.param, fail.platform)
}

// 语义化快捷
showToastSuccess('成功')
showToastError('失败')
showToastInfo('消息')

// 手动隐藏（自绘通道可靠隐藏，含 position 形态）
hideToast()

// ─── 全局默认配置 ───────────────────────────────
import { configureToast } from '@/uni_modules/unix-utils'

configureToast({
  duration: 2000,  // 默认展示时长
  icon: 'success', // 默认图标
  mask: false,     // 默认是否显示蒙层
})

// ─── 弹出第一个模态弹窗（modal 模块）────────────
import { showModal } from '@/uni_modules/unix-utils'

// 与 uni.showModal 同构，迁移零成本
showModal({
  title: '删除确认',
  content: '删除后不可恢复，是否继续？',
  confirmColor: '#ff0000',
  success: (res) => {
    if (res.confirm) doDelete() // confirm / cancel 恒存在且互斥
  },
})

// ─── Promise 式、alert 语义与全局默认 ───────────
import { showModalAsync, showModalAlert, configureModal } from '@/uni_modules/unix-utils'

// Promise 式：点取消不算失败（resolve），失败 reject ModalFail 结构的 JSON 字符串
const res = await showModalAsync({ title: '保存修改', content: '是否保存当前修改？' })
if (res.confirm) save()

// alert 语义（单确定按钮）
showModalAlert('提示', '操作已完成')

// 全局默认：字段传 null 表示沿用库内置默认 / 平台默认
configureModal({
  confirmText: '知道了',
  confirmColor: '#00aa00',
  cancelText: null,
  cancelColor: null,
})`,
    usageLang: 'UTS',
    useCases: [
      'uni-app x 项目统一各端 Toast / Modal 行为与降级策略',
      '替代手写 uni.showToast / uni.showModal 封装：position 不支持、cancel 缺失、按钮文案截断等各端差异库内抹平',
      '需要 Promise 式调用、alert 语义或全局默认配置的弹窗场景',
    ],
    repo: 'https://github.com/MengXi-Studio/unix-utils',
    docs: 'https://mengxi-studio.github.io/unix-utils/',
    npm: { pkg: '@meng-xi/unix-utils', version: '0.2.0', date: '2026-10-19', downloads: 251 },
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
    npm: { pkg: '@meng-xi/unix-request', version: '0.1.0', date: '2026-10-13', downloads: 11 },
    stars: 0,
  },
  {
    slug: 'unix-storage',
    name: 'unix-storage',
    platform: 'uni-app x',
    tagline: '为 uni-app x 提供功能完善的本地缓存库',
    description:
      'axios 心智的 uni-app x 本地缓存库（UTS 编写），底层唯一依赖 uni.setStorage 系列原生 API，不重造存储栈。多实例、统一错误结构、三级配置合并心智完全对齐 axios；TTL 过期、key 前缀命名空间、未命中转译等由库内确定性实现抹平，一套 API 多端覆盖。',
    features: [
      'axios 心智开箱即用：set / get / remove / clear / info / keys / clearExpired 七个顶层函数默认实例即用；createStorage 多实例隔离，configureStorage 配置全局默认',
      'TTL 过期管理：set(key, data, ttl) 毫秒级过期；读取惰性判断（过期即移除）；clearExpired() 全量扫描返回清理条数；三级回退（调用级 ttl → 实例 defaultTTL → 内置永不过期）',
      'key 前缀命名空间：默认前缀 mx_storage:；keys() 剥前缀返回原始 key；clear() 仅清理本命名空间；非法保留前缀操作期 ERR_PARAM 拦截',
      '未命中不是错误：原生 data not found fail 在 adapter 层统一转译为 resolve(null)，业务侧只判空，调用点不再逐个兜 fail',
      '统一可预测的错误结构：StorageError（ERR_PARAM / ERR_NATIVE），原生 errCode 经 nativeErrCode 原值透传，errSubject 多库混用可过滤来源，key 挂载关联业务 key',
      '兼容存量数据：读到非本库格式的数据按「无过期」原样返回，不报错不误删，渐进迁移无负担',
      '泛型与类型还原：get<T> 泛型静态标注；type 对象读回 UTSJSONObject，统一 JSON.parse<T>(JSON.stringify(raw)) 官方路径还原',
      '强类型 UTS：配置字段 | null 空安全兜底，错误码字面量联合类型；全端同构无平台目录端，一套源码走遍 uni-app x',
    ],
    install: 'npm install @meng-xi/unix-storage',
    installNote:
      '使用前将包内容同步到工程 uni_modules/ux-storage/（编译器不扫描 node_modules）：mkdir -p uni_modules && cp -R node_modules/@meng-xi/unix-storage uni_modules/ux-storage，业务侧从 @/uni_modules/ux-storage 导入。',
    usage: `// ─── 默认实例开箱即用 ────────────────────────────
import { set, get, configureStorage } from '@/uni_modules/ux-storage'
import type { StorageDefaults } from '@/uni_modules/ux-storage'

// 项目启动时配置一次全局默认（如 App.uvue onLaunch；null 表示沿用内置默认）
configureStorage({
  keyPrefix: null, // null 沿用内置默认 'mx_storage:'
  defaultTTL: null, // null 永不过期
} as StorageDefaults)

// TTL 1 小时；null = 永不过期（或沿用实例 defaultTTL）
await set('token', { value: 'xxx' } as TokenInfo, 3600_000)

// 未命中 / 已过期返回 null，不 reject
const token = await get('token')

// 类型还原（UTSJSONObject 读回，官方路径）
const restored = JSON.parse<TokenInfo>(JSON.stringify(token))

// ─── TTL 与清理 ─────────────────────────────────
import { set, get, remove, clearExpired } from '@/uni_modules/ux-storage'

await set('session', data, 60_000) // 60 秒过期
await get('session') // 过期：惰性移除并返回 null

const count = await clearExpired() // 全量扫描，返回清理条数
await remove('session') // 移除指定 key

// ─── 命名空间与多实例 ───────────────────────────
import { keys, clear, createStorage } from '@/uni_modules/ux-storage'
import type { StorageDefaults } from '@/uni_modules/ux-storage'

await keys() // 本命名空间 key（剥前缀后返回原始 key）
await clear() // 仅清理本命名空间，不触碰其他数据

// 多实例隔离（前缀 / defaultTTL 独立）
const cacheStore = createStorage({ keyPrefix: 'api_cache:', defaultTTL: 300_000 } as StorageDefaults)
await cacheStore.set('user:1', user, null)

// ─── 统一错误处理 ───────────────────────────────
import { set } from '@/uni_modules/ux-storage'
import type { StorageError } from '@/uni_modules/ux-storage'

set('', data, null).catch((err) => {
  const e = err as StorageError
  // e.code: 'ERR_PARAM'（key 为空 / keyPrefix 保留前缀）| 'ERR_NATIVE'（原生失败）
  // e.errSubject 固定 'unix-storage'；e.nativeErrCode 原生 errCode 原值透传；e.key 关联业务原始 key
})`,
    usageLang: 'UTS',
    useCases: [
      '替代手写 uni.setStorage 封装：回调包装、过期轮转、key 防冲突开箱即用',
      'token / session 等有时效数据的 TTL 管理与全量清理',
      '多业务模块间的存储命名空间隔离，clear 不误伤其他业务数据',
    ],
    repo: 'https://github.com/MengXi-Studio/unix-storage',
    docs: 'https://mengxi-studio.github.io/unix-storage/',
    npm: { pkg: '@meng-xi/unix-storage', version: '0.1.0', date: '2026-10-17', downloads: 0 },
    stars: 0,
  },
  {
    slug: 'unix-pinia',
    name: 'unix-pinia',
    platform: 'uni-app x',
    tagline: '为 uni-app x 提供 Pinia 风格的状态管理库',
    description:
      'Pinia 心智的 uni-app x 状态管理库（UTS 编写，setup 式）。uni-app x 的 vdom 模式 App 原生端无法使用标准 Pinia，unix-pinia 把 Pinia 的使用习惯完整搬到 UTS：setup 式 defineStore、storeToRefs、免挂载单例、插件体系，一比一复刻 API 面，裁掉平台不可实现项并给足替代方案，一套 API 多端覆盖。',
    features: [
      'setup 式 defineStore：defineStore<T>(id, setup)，state 用 Ref、getter 用 ComputedRef、action 用箭头函数，与 Pinia 官方推荐写法一致',
      '免挂载单例：模块级注册表保证应用级单例，跨页面共享状态，无需 app.use，纯状态管理零挂载代码',
      '实例 API 顶层函数映射：patch / dispose / getStoreId 对应 $patch / $dispose / $id（UTS 无 Proxy，无法在 store 对象上挂方法）',
      '跨 store 依赖：setup 内直接调用对方 useStore，注册表保证单例',
      '插件体系：pinia.use(plugin) 链式注册，PiniaPluginContext（pinia / store / storeId）对齐标准 Pinia 三字段',
      '幂等与可预测：同 id 重复 defineStore 警告并返回既有实例；dispose 后 useStore 重建全新实例',
      '强类型 UTS：全量显式类型标注；Kotlin 泛型擦除边界已在库内收敛，业务侧零感知',
      '双端实测：Web（JS 编译链）与 Android（Kotlin 编译链、真机）全用例通过，双端行为一致',
    ],
    install: 'npm install @meng-xi/unix-pinia',
    installNote:
      '使用前将包内容同步到工程 uni_modules/ux-pinia/（编译器不扫描 node_modules）：mkdir -p uni_modules && cp -R node_modules/@meng-xi/unix-pinia uni_modules/ux-pinia，业务侧从 @/uni_modules/ux-pinia 导入；另支持 HBuilderX 插件市场搜索 ux-pinia 导入。',
    usage: `// ─── 定义 store（stores/counter.uts）────────────
import type { Ref, ComputedRef } from 'vue'
import { defineStore } from '@/uni_modules/ux-pinia'

export type CounterStore = {
  count: Ref<number>,                   // state：Ref
  doubleCount: ComputedRef<number>,     // getter：ComputedRef
  increment: () => void,                // action：箭头函数（UTS 函数声明不能作值传递）
  reset: () => void                     // $reset 的替代：自定义 reset action
}

export const useCounterStore = defineStore<CounterStore>('counter', (): CounterStore => {
  const count: Ref<number> = ref(0)
  const doubleCount: ComputedRef<number> = computed((): number => count.value * 2)
  const increment = (): void => { count.value++ }
  const reset = (): void => { count.value = 0 }
  return { count, doubleCount, increment, reset } as CounterStore
})

// ─── 页面使用 ───────────────────────────────────
import { storeToRefs } from '@/uni_modules/ux-pinia'
import { useCounterStore } from '@/stores/counter.uts'

const store = useCounterStore()                    // 多次调用返回同一实例（跨页面共享）
const { count, doubleCount } = storeToRefs(store)  // 模板解构自动解包

store.count.value++                                // 脚本访问 state：.value（UTS 无 Proxy 不自动解包）

// ─── 实例 API（$-methods 顶层函数映射）──────────
import { patch, dispose, getStoreId } from '@/uni_modules/ux-pinia'

// ≙ store.$patch(fn)：批量修改
patch(store, (s: CounterStore): void => { s.count.value = 10 })

const id: string = getStoreId(store)   // ≙ store.$id → 'counter'

dispose(store)                         // ≙ store.$dispose()：注销后下次 useStore 重建

// ─── 跨 store 与插件 ────────────────────────────
export const useUserStore = defineStore<UserStore>('user', (): UserStore => {
  const counterStore = useCounterStore()  // 跨 store 依赖：setup 内直接调用对方 useStore
  const score: Ref<number> = ref(0)
  const addScoreFromCount = (): void => { score.value += counterStore.count.value }
  return { score, addScoreFromCount } as UserStore
})

// 插件（可选；main.uts 顶层登记）
import { createPinia, setActivePinia } from '@/uni_modules/ux-pinia'
setActivePinia(createPinia().use(myPlugin))`,
    usageLang: 'UTS',
    useCases: [
      'uni-app x vdom 模式 App 原生端的状态管理（该端无法使用标准 Pinia）',
      '跨页面共享的全局状态：登录态、用户信息、主题配置等',
      '写过 Pinia 的团队零成本迁移状态层范式',
    ],
    repo: 'https://github.com/MengXi-Studio/unix-pinia',
    docs: 'https://mengxi-studio.github.io/unix-pinia/',
    npm: { pkg: '@meng-xi/unix-pinia', version: '0.1.0', date: '2026-10-18', downloads: 0 },
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
    usage: `<!-- pages.json：配置 easycom 自动导入 -->
<!-- {"easycom": {"custom": {"^mx-(.*)": "@mengxi/uni-ui/src/components/mx-$1/mx-$1.vue"}}} -->

<mx-button type="primary">主要按钮</mx-button>`,
    usageLang: 'Vue',
    useCases: ['uni-app 项目需要 Vant 风格的跨端组件库'],
    repo: 'https://github.com/MengXi-Studio/uni-ui',
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
    slug: 'unix-architecture',
    name: 'unix-architecture',
    platform: 'uni-app x',
    tagline: '为 uni-app x 打造的一体化架构模板',
    description:
      'api / stores / router / utils / pages 全分层落地，底层由梦曦工作室自研插件系（unix-* / mx-*）承载：mx-request 网络层、ux-pinia 状态层、ux-router 路由层、ux-storage 凭证持久化。预置登录鉴权闭环、生成式路由、类型组织标准与 AI 辅助开发体系（.trae/），旨在解决 uni-app x 原生 vdom 模式下状态管理、网络请求、本地存储、路由导航等基础能力缺失的问题。',
    features: [
      '全分层落地：网络 / 接口 / 凭证 / 状态 / 路由 / 守卫 / 配置 / 视图各层职责单一、依赖单向，底层由自研插件系承载（mx-request / ux-pinia / ux-router / ux-storage）',
      '鉴权守卫闭环：白名单 + token 检查 + getInfo + 重定向（query 带 redirect），冷启动经 router.isReady() 补跑 guardRoute 守卫链，消除 H5 直达 / deeplink 竞态',
      'token 同步读写体验：ux-storage 异步持久化 + 模块级内存缓存，守卫内 await ensureAuthReady() 只读一次持久层',
      '统一错误提示：响应拦截器按错误码映射文案，ERR_CANCELED 静默放行，错误仍 reject 给调用方做业务处理',
      '生成式路由：routes.gen.uts 与页面级 defineUniPage 宏由 @meng-xi/unix-router vite 插件自动生成，新增页面 = 建文件 + 注册 + 页内宏',
      '类型组织标准：「类型跟着消费关系走」，跨层共享类型经 <域>/types.uts 聚合出口具名转发，DTO 在 api 层内联 JSON.parse<T> 还原（规避 Kotlin 泛型擦除）',
      '登录鉴权示例完整：登录 / getInfo / logout / resetToken 全链路 + mock 服务协议，baseURL 一处替换即可接真实后端',
      'AI 辅助开发体系：.trae/rules + skills + documents + uni-app-x MCP 配置随仓库沉淀，把「AI 如何在此架构下工作」固化为可执行约束',
    ],
    useCases: [
      '作为 uni-app x 新项目的工程骨架，在分层结构上直接开发业务',
      '学习 uni-app x 原生 vdom 模式下的工程化分层与 UTS 红线实践',
      '一键接入梦曦插件系（unix-* / mx-*）的标准装配范式',
    ],
    repo: 'https://github.com/MengXi-Studio/unix-architecture',
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
    npm: { pkg: '@meng-xi/create-uni-app', version: '1.2.1', date: '2026-09-20', downloads: 220 },
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
    npm: { pkg: '@meng-xi/vite-plugin', version: '1.4.1', date: '2026-09-16', downloads: 304 },
    stars: 5,
  },
]

export const totalDownloads = projects.reduce((sum, p) => sum + (p.npm?.downloads ?? 0), 0)

export const npmCount = projects.filter((p) => p.npm).length

export const docSites = projects.filter((p) => p.docs).length
