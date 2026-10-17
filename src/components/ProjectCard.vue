<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Project } from '@/data/projects'
import { platformClass, platformLabel } from '@/data/projects'
import { useLiveStats } from '@/utils/live-stats'
import { GithubIcon, BookIcon, StarIcon } from './icons'

const props = defineProps<{ project: Project }>()

const { stars: liveStars } = useLiveStats()
const displayStars = computed(() => liveStars.value[props.project.slug] ?? props.project.stars)
</script>

<template>
  <article class="glass-card project-card">
    <div class="project-card-top">
      <RouterLink :to="`/projects/${project.slug}`" class="project-name">
        {{ project.name }}
      </RouterLink>
      <span class="platform-tag" :class="platformClass[project.platform]">
        {{ platformLabel[project.platform] }}
      </span>
    </div>

    <p class="project-tagline">{{ project.tagline }}</p>

    <div class="project-card-foot">
      <span class="project-stars">
        <StarIcon />
        {{ displayStars }}
      </span>
      <div class="project-links">
        <a
          v-if="project.docs"
          class="icon-link"
          :href="project.docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BookIcon />
          文档
        </a>
        <a
          class="icon-link"
          :href="project.repo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
          仓库
        </a>
        <RouterLink class="icon-link" :to="`/projects/${project.slug}`">详情</RouterLink>
      </div>
    </div>
  </article>
</template>
