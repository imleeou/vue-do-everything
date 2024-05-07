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
          title: '随机点名'
        }
      },
      {
        path: 'loading',
        name: 'Loading',
        component: () => import('@/views/feature/loading/index.vue'),
        meta: {
          title: '加载'
        }
      },
      {
        path: 'gluttonousSnake',
        name: 'GluttonousSnake',
        component: () => import('@/views/feature/gluttonousSnake/index.vue'),
        meta: {
          title: '贪吃蛇'
        }
      },
      {
        path: 'virtualWaterfallFlow',
        name: 'VirtualWaterfallFlow',
        component: () => import('@/views/feature/virtualWaterfallFlow/index.vue'),
        meta: {
          title: '虚拟瀑布流',
          showLayout: false
        }
      }
    ]
  }
]
export default routes
