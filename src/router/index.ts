import { createWebHistory, RouteRecordRaw, createRouter } from 'vue-router'
import feature from './feature'
let routes = <RouteRecordRaw[]>[
  {
    path: '/',
    name: 'Home',
    meta: {
      showLayout: true
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('@/views/article/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue')
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/404' }
]

// Merge feature routes
routes = [...routes, ...feature]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
