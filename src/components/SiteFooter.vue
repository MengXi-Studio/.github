<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { asset } from '@/utils/assets'
import { projects } from '@/data/projects'

const docLinks = projects
  .filter((p) => p.docs)
  .slice(0, 4)
  .map((p) => ({ label: p.name, href: p.docs! }))
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-inner">
        <div>
          <div class="footer-brand">
            <img :src="asset('logo.png')" alt="MengXi-Studio" />
            <span>MengXi-Studio</span>
          </div>
          <p class="footer-desc">
            专注 uni-app / uni-app x 生态的开源工作室，让「一套代码，多端运行」更简单、更高效。
          </p>
        </div>

        <div class="footer-links">
          <div class="footer-col">
            <h5>项目</h5>
            <RouterLink
              v-for="p in projects.slice(0, 5)"
              :key="p.slug"
              :to="`/projects/${p.slug}`"
            >
              {{ p.name }}
            </RouterLink>
          </div>
          <div class="footer-col">
            <h5>文档</h5>
            <a
              v-for="d in docLinks"
              :key="d.label"
              :href="d.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ d.label }}
            </a>
          </div>
          <div class="footer-col">
            <h5>链接</h5>
            <a href="https://github.com/MengXi-Studio" target="_blank" rel="noopener noreferrer">
              GitHub 组织
            </a>
            <a href="https://www.npmjs.com/org/meng-xi" target="_blank" rel="noopener noreferrer">
              npm 组织
            </a>
            <a
              href="https://github.com/orgs/MengXi-Studio/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              反馈 Issue
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 MengXi-Studio · 基于 MIT License 发布</span>
        <a
          href="https://github.com/MengXi-Studio/.github/blob/master/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
        >
          MIT License
        </a>
      </div>
    </div>
  </footer>
</template>
