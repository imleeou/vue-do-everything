import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/feature',
    name: 'Feature',
    children: [
      {
        path: 'randomName',
        name: 'RandomName',
        component: () => import('@/views/feature/randomName/index.vue'),
        meta: {
          title: '功能',
          hiddenLayout: true
        }
      }
    ]
  }
]
export default routes
