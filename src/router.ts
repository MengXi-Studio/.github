import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { projects } from '@/data/projects'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/projects/:slug',
      name: 'project',
      component: () => import('@/views/ProjectView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

const baseTitle = 'MengXi-Studio · 专注 uni-app / uni-app x 生态的开源工作室'

router.afterEach((to) => {
  if (to.name === 'home') {
    document.title = baseTitle
  } else if (to.name === 'project') {
    const p = projects.find((x) => x.slug === to.params.slug)
    document.title = p ? `${p.name} - ${p.tagline} | MengXi-Studio` : baseTitle
  } else {
    document.title = `页面未找到 | MengXi-Studio`
  }
})
