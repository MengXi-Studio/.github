import { readonly, ref } from 'vue'
import { projects } from '@/data/projects'

const CACHE_KEY = 'mx-live-stats-v1'
const CACHE_TTL = 10 * 60 * 1000

interface LiveStatsData {
  stars: Record<string, number>
  versions: Record<string, string>
  downloads: Record<string, number>
}

const stars = ref<Record<string, number>>({})
const versions = ref<Record<string, string>>({})
const downloads = ref<Record<string, number>>({})
let fetching: Promise<void> | null = null

async function fetchJson<T = any>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json()
}

function readCache(): LiveStatsData | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (Date.now() - parsed.t > CACHE_TTL) return null
    return parsed.data ?? null
  } catch {
    return null
  }
}

function writeCache(data: LiveStatsData): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data }))
  } catch {
    /* 存储不可用时忽略 */
  }
}

async function load(): Promise<void> {
  // GitHub：一次请求拉取组织全部仓库的 stars（未认证 60 次/小时/IP，按访客计算）
  const gh = fetchJson<Array<{ name: string; stargazers_count: number }>>(
    'https://api.github.com/orgs/MengXi-Studio/repos?per_page=100',
  ).then((repos) => {
    for (const r of repos) stars.value[r.name] = r.stargazers_count
  })

  // npm：逐包拉取最新版本与近 30 天下载量（registry 与 downloads API 均支持 CORS）
  const npm = Promise.all(
    projects
      .filter((p) => p.npm)
      .map(async (p) => {
        const pkg = p.npm!.pkg
        const [latest, dl] = await Promise.allSettled([
          fetchJson(`https://registry.npmjs.org/${encodeURIComponent(pkg)}/latest`),
          fetchJson(`https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(pkg)}`),
        ])
        if (latest.status === 'fulfilled' && latest.value?.version)
          versions.value[pkg] = latest.value.version
        if (dl.status === 'fulfilled' && typeof dl.value?.downloads === 'number')
          downloads.value[pkg] = dl.value.downloads
      }),
  )

  await Promise.allSettled([gh, npm])
  writeCache({ stars: stars.value, versions: versions.value, downloads: downloads.value })
}

/**
 * 实时统计数据（stars / npm 版本 / 月下载量）。
 * 首次调用触发后台拉取并写入 sessionStorage 缓存（10 分钟），
 * 拉取完成前组件先展示 projects.ts 中的静态值，失败时静默保留静态值。
 */
export function useLiveStats() {
  if (!fetching && typeof window !== 'undefined') {
    const cached = readCache()
    if (cached) {
      stars.value = cached.stars
      versions.value = cached.versions
      downloads.value = cached.downloads
    } else {
      fetching = load().catch(() => {
        /* 静默失败，回退静态数据 */
      })
    }
  }
  return {
    stars: readonly(stars),
    versions: readonly(versions),
    downloads: readonly(downloads),
  }
}
