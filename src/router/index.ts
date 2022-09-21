import { createWebHistory, RouteRecordRaw, createRouter } from 'vue-router'

const routes = <RouteRecordRaw[]>[
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
