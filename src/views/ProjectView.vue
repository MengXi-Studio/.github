<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects, platformClass, platformLabel } from '@/data/projects'
import { useLiveStats } from '@/utils/live-stats'
import ProjectCard from '@/components/ProjectCard.vue'
import CopyBlock from '@/components/CopyBlock.vue'
import { GithubIcon, BookIcon, PackageIcon, IssueIcon, CheckIcon, StarIcon } from '@/components/icons'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const project = computed(() => projects.find((p) => p.slug === slug.value))
const related = computed(() =>
  project.value
    ? projects.filter((p) => p.slug !== project.value!.slug && p.platform === project.value!.platform)
    : [],
)

const npmBadge = computed(() => {
  const npm = project.value?.npm
  if (!npm) return null
  return {
    version: `https://img.shields.io/npm/v/${encodeURIComponent(npm.pkg)}?style=flat-square&color=2b9939`,
    downloads: `https://img.shields.io/npm/dm/${encodeURIComponent(npm.pkg)}?style=flat-square&color=2b9939`,
    href: `https://www.npmjs.com/package/${npm.pkg}`,
  }
})

const starBadge = computed(
  () =>
    project.value &&
    `https://img.shields.io/github/stars/MengXi-Studio/${project.value.slug}?style=flat-square&color=2b9939`,
)

const { versions: liveVersions, downloads: liveDownloads } = useLiveStats()

// 实时 npm 版本 / 下载量，未拉取成功时回退静态值
const displayNpm = computed(() => {
  const npm = project.value?.npm
  if (!npm) return null
  return {
    version: liveVersions.value[npm.pkg] ?? npm.version,
    downloads: liveDownloads.value[npm.pkg] ?? npm.downloads ?? 0,
  }
})
</script>

<template>
  <main v-if="project" class="detail-page">
    <div class="container">
      <!-- 项目头 -->
      <header class="detail-header fade-up">
        <div class="detail-title-row">
          <h1 class="detail-title">{{ project.name }}</h1>
          <span class="platform-tag" :class="platformClass[project.platform]">
            {{ platformLabel[project.platform] }}
          </span>
        </div>
        <p class="detail-desc">{{ project.description }}</p>
        <div class="detail-badges" v-reveal.stagger>
          <img v-if="starBadge" :src="starBadge" alt="stars" />
          <template v-if="npmBadge">
            <a :href="npmBadge.href" target="_blank" rel="noopener noreferrer">
              <img :src="npmBadge.version" alt="npm version" />
            </a>
            <a :href="npmBadge.href" target="_blank" rel="noopener noreferrer">
              <img :src="npmBadge.downloads" alt="npm downloads" />
            </a>
          </template>
          <a
            v-if="project.docs"
            :href="project.docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.shields.io/badge/docs-在线文档-2b9939?style=flat-square"
              alt="docs"
            />
          </a>
        </div>
      </header>

      <!-- 功能特性 -->
      <section class="detail-section" v-reveal>
        <h2 class="detail-section-title">功能特性</h2>
        <div class="feature-list" v-reveal.stagger>
          <div v-for="f in project.features" :key="f" class="glass-card feature-item">
            <span class="check"><CheckIcon /></span>
            <p>{{ f }}</p>
          </div>
        </div>
      </section>

      <!-- 快速开始 -->
      <section class="detail-section" v-reveal>
        <h2 class="detail-section-title">快速开始</h2>
        <template v-if="project.install">
          <CopyBlock :command="project.install" :title="project.npm?.pkg" />
          <p v-if="project.installNote" class="section-desc" style="margin-bottom: 16px">
            {{ project.installNote }}
          </p>
        </template>
        <div v-else class="glass-card scene-item">
          <span class="dot" />
          <p>该项目尚未发布 npm 包，请前往 <a :href="project.repo" target="_blank" rel="noopener noreferrer" style="color: var(--green)">GitHub 仓库</a> 获取源码与使用方式。</p>
        </div>
        <template v-if="project.usage">
          <CopyBlock v-if="project.usageLang === 'Shell'" :command="project.usage" title="Shell" />
          <pre v-else class="code-block"><code>{{ project.usage }}</code></pre>
        </template>
      </section>

      <!-- 适用场景 -->
      <section class="detail-section" v-reveal>
        <h2 class="detail-section-title">适用场景</h2>
        <div class="scene-list">
          <div v-for="u in project.useCases" :key="u" class="glass-card scene-item">
            <span class="dot" />
            <p>{{ u }}</p>
          </div>
        </div>
      </section>

      <!-- 版本信息 -->
      <section class="detail-section" v-reveal>
        <h2 class="detail-section-title">版本信息</h2>
        <div class="meta-grid">
          <template v-if="project.npm && displayNpm">
            <div class="glass-card meta-card">
              <div class="meta-label">npm 包</div>
              <div class="meta-value">{{ project.npm.pkg }}</div>
            </div>
            <div class="glass-card meta-card">
              <div class="meta-label">最新版本</div>
              <div class="meta-value">
                v{{ displayNpm.version ?? '—' }}
                <small v-if="project.npm.date">发布于 {{ project.npm.date }}</small>
              </div>
            </div>
            <div class="glass-card meta-card">
              <div class="meta-label">月下载</div>
              <div class="meta-value">{{ displayNpm.downloads }}</div>
            </div>
          </template>
          <template v-else>
            <div class="glass-card meta-card">
              <div class="meta-label">获取方式</div>
              <div class="meta-value">GitHub 仓库 <small>未发布 npm</small></div>
            </div>
            <div class="glass-card meta-card">
              <div class="meta-label">协议</div>
              <div class="meta-value">MIT License</div>
            </div>
            <div class="glass-card meta-card">
              <div class="meta-label">Stars</div>
              <div class="meta-value">
                <StarIcon style="color: #e3b341; vertical-align: -2px" />
                {{ project.stars }}
              </div>
            </div>
          </template>
        </div>
      </section>

      <!-- 链接 -->
      <section class="detail-section" v-reveal>
        <h2 class="detail-section-title">相关链接</h2>
        <div class="link-grid">
          <a class="glass-card link-card" :href="project.repo" target="_blank" rel="noopener noreferrer">
            <span class="link-icon"><GithubIcon /></span>
            <div>
              <h4>GitHub 仓库</h4>
              <p>MengXi-Studio/{{ project.slug }}</p>
            </div>
          </a>
          <a
            v-if="project.docs"
            class="glass-card link-card"
            :href="project.docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="link-icon"><BookIcon /></span>
            <div>
              <h4>在线文档</h4>
              <p>{{ project.docs.replace('https://', '') }}</p>
            </div>
          </a>
          <a
            v-if="project.npm"
            class="glass-card link-card"
            :href="`https://www.npmjs.com/package/${project.npm.pkg}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="link-icon"><PackageIcon /></span>
            <div>
              <h4>npm 包</h4>
              <p>{{ project.npm.pkg }}</p>
            </div>
          </a>
          <a
            class="glass-card link-card"
            :href="`${project.repo}/issues`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="link-icon"><IssueIcon /></span>
            <div>
              <h4>反馈 Issue</h4>
              <p>提交问题与建议</p>
            </div>
          </a>
        </div>
      </section>

      <!-- 相关项目 -->
      <section v-if="related.length" class="detail-section" v-reveal>
        <h2 class="detail-section-title">相关项目</h2>
        <div class="related-grid">
          <ProjectCard v-for="p in related" :key="p.slug" v-tilt :project="p" />
        </div>
      </section>
    </div>
  </main>

  <!-- 未找到 -->
  <main v-else class="not-found">
    <div class="not-found-code">404</div>
    <p>未找到该项目，可能已被移动或重命名。</p>
    <RouterLink to="/" class="btn btn-primary">返回首页</RouterLink>
  </main>
</template>
