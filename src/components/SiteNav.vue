<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { asset } from '@/utils/assets'
import { GithubIcon } from './icons'
</script>

<template>
  <header class="site-nav">
    <div class="site-nav-inner">
      <RouterLink to="/" class="nav-brand">
        <img :src="asset('logo.png')" alt="MengXi-Studio" />
        <span>MengXi-Studio</span>
      </RouterLink>

      <nav class="nav-links">
        <RouterLink class="nav-link" :to="{ path: '/', hash: '#projects' }">项目</RouterLink>
        <RouterLink class="nav-link" :to="{ path: '/', hash: '#about' }">关于</RouterLink>
        <RouterLink class="nav-link" :to="{ path: '/', hash: '#community' }">社区</RouterLink>
        <a
          class="nav-github"
          href="https://github.com/MengXi-Studio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
          GitHub
        </a>
      </nav>
    </div>
  </header>
</template>
