<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import SiteNav from '@/components/SiteNav.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const route = useRoute()
</script>

<template>
  <div class="page-backdrop" aria-hidden="true" />
  <SiteNav />
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
  <SiteFooter />
</template>
