<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteNav from '@/components/SiteNav.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
	<div class="page-backdrop" aria-hidden="true" />
	<SiteNav />
	<RouterView />
	<SiteFooter />
</template>
