<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { asset } from '@/utils/assets'
import { GithubIcon } from './icons'

const scrolled = ref(false)
const onScroll = (): void => {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="site-nav" :class="{ scrolled }">
    <div class="site-nav-inner">
      <RouterLink to="/" class="nav-brand">
        <img :src="asset('images/logo.png')" alt="MengXi-Studio" />
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
