<script setup lang="ts">
import { computed, ref } from 'vue'
import { asset } from '@/utils/assets'
import {
  projects,
  platformLabel,
  totalDownloads,
  npmCount,
  docSites,
  type Platform,
} from '@/data/projects'
import { useLiveStats } from '@/utils/live-stats'
import ProjectCard from '@/components/ProjectCard.vue'

const { downloads: liveDownloads } = useLiveStats()

// 所有 npm 包的实时下载量均已拉取成功时展示实时总和，否则回退静态值
const displayDownloads = computed(() => {
  const pkgs = projects.filter((p) => p.npm)
  if (!pkgs.length) return totalDownloads
  const live = pkgs.reduce<number | null>((sum, p) => {
    const d = liveDownloads.value[p.npm!.pkg]
    return d === undefined ? null : (sum ?? 0) + d
  }, null)
  return live ?? totalDownloads
})

type Tab = '全部' | Platform
const tabs: Tab[] = ['全部', 'uni-app', 'uni-app x', '通用']
const active = ref<Tab>('全部')

// Hero 鼠标聚光灯：光斑跟随光标
const heroEl = ref<HTMLElement>()
function onHeroMove(e: MouseEvent): void {
  const el = heroEl.value
  if (!el) return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
  el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
}

const filtered = computed(() =>
  active.value === '全部' ? projects : projects.filter((p) => p.platform === active.value),
)

const npmOrgUrl = 'https://www.npmjs.com/org/meng-xi'

const badges = [
  {
    href: 'https://github.com/MengXi-Studio/.github/blob/master/LICENSE',
    src: 'https://img.shields.io/github/license/MengXi-Studio/.github.svg?style=flat-square&color=2b9939',
    alt: 'License',
  },
  {
    href: 'https://uniapp.dcloud.net.cn/',
    src: 'https://img.shields.io/badge/uni--app-3.x-2b9939?style=flat-square',
    alt: 'uni-app',
  },
  {
    href: 'https://doc.dcloud.net.cn/uni-app-x/',
    src: 'https://img.shields.io/badge/uni--app%20x-2b9939?style=flat-square',
    alt: 'uni-app x',
  },
  {
    href: npmOrgUrl,
    src: 'https://img.shields.io/badge/npm-%40meng--xi-2b9939?style=flat-square&logo=npm',
    alt: 'npm',
  },
]

const community = [
  { img: 'images/wechat-group-main.jpg', title: '微信总群', desc: '开源社区 · 总群' },
  { img: 'images/wechat-group-announce.jpg', title: '公告通知群', desc: '版本发布 / 重要通知' },
  { img: 'images/qq-group-560903974.jpg', title: 'QQ 交流群', desc: '560903974' },
  { img: 'images/qq-group-1058502344.jpg', title: 'QQ 交流群', desc: '1058502344' },
  { img: 'images/wechat-official-account.jpg', title: '微信公众号', desc: '关注获取动态' },
]

const aboutCards = [
  {
    icon: '🧭',
    title: '我们做什么',
    desc: '专注 uni-app / uni-app x 生态的基础能力建设：路由管理、网络请求、工具集、UI 组件、脚手架与构建插件，覆盖跨端开发的核心链路。',
  },
  {
    icon: '🚀',
    title: '为什么是我们',
    desc: 'API 设计对齐社区成熟心智（vue-router / axios / Vant），让现有经验零成本迁移；UTS 源码分发，由编译链编译到各端原生实现。',
  },
  {
    icon: '🤝',
    title: '如何运作',
    desc: '全部项目基于 MIT 协议开源，文档与示例持续维护，欢迎通过 Issue 反馈问题、提交 Pull Request 共建 uni-app 生态。',
  },
]
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="hero" ref="heroEl" @mousemove="onHeroMove">
      <div class="hero-glow hero-glow-green" aria-hidden="true" />
      <div class="hero-glow hero-glow-cyan" aria-hidden="true" />
      <div class="hero-spotlight" aria-hidden="true" />
      <div class="container">
        <div class="fade-up">
          <img class="hero-logo" :src="asset('images/logo.png')" alt="MengXi-Studio" />
        </div>
        <h1 class="hero-title fade-up fade-up-delay-1">
          让「一套代码，多端运行」<br />
          <span class="gradient-text">更简单、更高效</span>
        </h1>
        <p class="hero-desc fade-up fade-up-delay-2">
          MengXi-Studio 专注 uni-app / uni-app x 生态，为跨平台开发者打造高质量、易用且可定制的
          路由、请求、UI 组件与工程化工具。
        </p>
        <div class="hero-actions fade-up fade-up-delay-2">
          <a class="btn btn-primary" href="#projects">浏览项目</a>
          <a
            class="btn btn-ghost"
            href="https://github.com/MengXi-Studio"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub 组织
          </a>
        </div>
        <div class="hero-badges fade-up fade-up-delay-3">
          <a v-for="b in badges" :key="b.alt" :href="b.href" target="_blank" rel="noopener noreferrer">
            <img :src="b.src" :alt="b.alt" />
          </a>
        </div>
      </div>
    </section>

    <!-- 数据带 -->
    <section class="container">
      <div class="stats-band" v-reveal.stagger>
        <div class="stat-card">
          <div class="stat-value" v-count-up>{{ projects.length }}</div>
          <div class="stat-label">开源项目</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" v-count-up>{{ npmCount }}</div>
          <div class="stat-label">npm 包</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" v-count-up>{{ displayDownloads }}+</div>
          <div class="stat-label">npm 月下载</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" v-count-up>{{ docSites }}</div>
          <div class="stat-label">在线文档站</div>
        </div>
      </div>
    </section>

    <!-- 项目一览 -->
    <section id="projects" class="section">
      <div class="container">
        <div class="section-head" v-reveal>
          <span class="kicker">Projects</span>
          <h2 class="section-title">生态总览</h2>
          <p class="section-desc">按平台浏览我们的开源项目，覆盖 uni-app 与 uni-app x 双端开发全链路。</p>
        </div>

        <div class="platform-tabs" role="tablist" v-reveal>
          <button
            v-for="t in tabs"
            :key="t"
            class="tab-btn"
            :class="{ active: active === t }"
            role="tab"
            :aria-selected="active === t"
            @click="active = t"
          >
            {{ t === '通用' ? platformLabel['通用'] : t }}
          </button>
        </div>

        <TransitionGroup name="grid" tag="div" class="project-grid" v-reveal.stagger>
          <ProjectCard
            v-for="(p, i) in filtered"
            :key="p.slug"
            v-tilt
            :project="p"
            :style="{ '--i': i }"
          />
        </TransitionGroup>
      </div>
    </section>

    <!-- 组织介绍 -->
    <section id="about" class="section">
      <div class="container">
        <div class="section-head" v-reveal>
          <span class="kicker">About Us</span>
          <h2 class="section-title">关于 MengXi-Studio</h2>
          <p class="section-desc">
            我们相信优秀的工程化工具能大幅提升开发体验，因此持续投入于跨端开发的基础设施建设。
          </p>
        </div>
        <div class="about-grid" v-reveal.stagger>
          <div v-for="c in aboutCards" :key="c.title" class="glass-card about-card">
            <div class="about-icon">{{ c.icon }}</div>
            <h3>{{ c.title }}</h3>
            <p>{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 社区 -->
    <section id="community" class="section">
      <div class="container">
        <div class="section-head" v-reveal>
          <span class="kicker">Community</span>
          <h2 class="section-title">加入社区</h2>
          <p class="section-desc">
            欢迎有意愿改善 uni-app 生态开发体验的朋友加入，让我们一起把 uni-app 系列产品变得更好。❤
          </p>
        </div>
        <div class="community-grid" v-reveal.stagger>
          <div v-for="c in community" :key="c.img" class="glass-card community-card">
            <img :src="asset(c.img)" :alt="c.title" loading="lazy" />
            <h4>{{ c.title }}</h4>
            <p>{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
