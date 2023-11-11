import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/feature',
    name: 'Feature',
    meta: {
      showLayout: true
    },
    children: [
      {
        path: 'randomName',
        name: 'RandomName',
        component: () => import('@/views/feature/randomName/index.vue'),
        meta: {
          title: '功能'
        }
      },
      {
        path: 'loading',
        name: 'Loading',
        component: () => import('@/views/feature/loading/index.vue'),
        meta: {
          title: '加载'
        }
      }
    ]
  }
]
export default routes
