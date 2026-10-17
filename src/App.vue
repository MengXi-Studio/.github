<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SiteNav from '@/components/SiteNav.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const route = useRoute()

// 滚动进度条 / 返回顶部 / 背景网格视差（统一 rAF 节流）
const progress = ref(0)
const showTop = ref(false)
let ticking = false

function onScroll(): void {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const y = window.scrollY
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? Math.min(y / max, 1) : 0
    showTop.value = y > 480
    document.documentElement.style.setProperty('--grid-y', String(y % 56))
    ticking = false
  })
}

function toTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div class="page-backdrop" aria-hidden="true" />
  <div class="scroll-progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />
  <SiteNav />
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
  <SiteFooter />
  <button class="back-to-top" :class="{ visible: showTop }" aria-label="返回顶部" @click="toTop">
    <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path
        fill-rule="evenodd"
        d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6a.5.5 0 1 0 .708.708L8 2.207l5.646 5.647a.5.5 0 0 0 .708-.708l-6-6Z"
      />
      <path
        fill-rule="evenodd"
        d="M8 3a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11A.5.5 0 0 1 8 3Z"
      />
    </svg>
  </button>
</template>
