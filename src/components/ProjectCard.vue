<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Project } from '@/data/projects'
import { platformClass, platformLabel } from '@/data/projects'
import { GithubIcon, BookIcon, StarIcon } from './icons'

defineProps<{ project: Project }>()
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
        {{ project.stars }}
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
