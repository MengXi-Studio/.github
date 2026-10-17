<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="not-found">
    <div class="not-found-code">404</div>
    <p>页面不存在或已被移动。</p>
    <RouterLink to="/" class="btn btn-primary">返回首页</RouterLink>
  </main>
</template>
