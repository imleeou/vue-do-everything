// @unocss-include
import { TabType } from '@/types/app'
import { IconTypeEnum, TabTypeEnum } from './enum'

/** 顶部tab数据 */
export const TABS: TabType[] = [
  {
    path: '/home',
    name: '首页',
    type: TabTypeEnum.NORMAL
  },
  {
    name: '没事找事',
    type: TabTypeEnum.DROPDOWN,
    children: [
      {
        path: '/feature/loading',
        name: '加载'
      },
      {
        path: '/feature/randomName',
        name: '随机点名'
      },
      {
        path: '/feature/gluttonousSnake',
        name: '贪吃蛇'
      }
    ]
  },
  {
    link: 'https://github.com/imleeou',
    type: TabTypeEnum.ICON,
    icon: 'i-carbon-logo-github',
    iconType: IconTypeEnum.CLASS
  }
]
