import { readonly, ref } from 'vue'
import { projects } from '@/data/projects'

const CACHE_KEY = 'mx-live-stats-v2'
const CACHE_TTL = 10 * 60 * 1000

interface LiveStatsData {
  stars: Record<string, number>
  versions: Record<string, string>
  dates: Record<string, string>
  downloads: Record<string, number>
}

const stars = ref<Record<string, number>>({})
const versions = ref<Record<string, string>>({})
const dates = ref<Record<string, string>>({})
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

  // npm：逐包拉取元数据（一次请求同时得到最新版本与发布时间）与近 30 天下载量
  // registry 与 downloads API 均支持 CORS
  const npm = Promise.all(
    projects
      .filter((p) => p.npm)
      .map(async (p) => {
        const pkg = p.npm!.pkg
        const [meta, dl] = await Promise.allSettled([
          fetchJson(`https://registry.npmjs.org/${encodeURIComponent(pkg)}`),
          fetchJson(`https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(pkg)}`),
        ])
        if (meta.status === 'fulfilled') {
          const ver = meta.value?.['dist-tags']?.latest
          if (ver) {
            versions.value[pkg] = ver
            const time = meta.value?.time?.[ver]
            if (time) dates.value[pkg] = new Date(time).toISOString().slice(0, 10)
          }
        }
        if (dl.status === 'fulfilled' && typeof dl.value?.downloads === 'number')
          downloads.value[pkg] = dl.value.downloads
      }),
  )

  await Promise.allSettled([gh, npm])
  writeCache({
    stars: stars.value,
    versions: versions.value,
    dates: dates.value,
    downloads: downloads.value,
  })
}

/**
 * 实时统计数据（stars / npm 版本 / 发布时间 / 月下载量）。
 * 首次调用触发后台拉取并写入 sessionStorage 缓存（10 分钟）；
 * 拉取完成前组件展示占位符，失败时保持占位符，不在仓库里维护静态数值。
 */
export function useLiveStats() {
  if (!fetching && typeof window !== 'undefined') {
    const cached = readCache()
    if (cached) {
      stars.value = cached.stars
      versions.value = cached.versions
      dates.value = cached.dates ?? {}
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
    dates: readonly(dates),
    downloads: readonly(downloads),
  }
}
