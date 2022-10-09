import { createWebHistory, RouteRecordRaw, createRouter } from 'vue-router'

const routes = <RouteRecordRaw[]>[
  {
    path: '/',
    name: 'Home',
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
    meta: {
      hideBackGround: true
    },
    component: () => import('@/views/404/index.vue')
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/404' }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
