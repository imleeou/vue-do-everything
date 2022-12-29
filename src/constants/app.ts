import { TabType } from '@/types/app'

/** 顶部tab数据 */
export const TABS: TabType[] = [
  {
    path: '/home',
    name: '首页',
    type: 'normal'
  },
  {
    name: '小玩意',
    type: 'dropdown',
    children: [
      {
        path: '/game',
        name: '游戏',
        type: 'normal'
      },
      {
        path: '/feature/randomName',
        name: '随机点名',
        type: 'normal'
      }
    ]
  },
  {
    link: 'https://github.com/imleeou',
    type: 'icon',
    icon: new URL('../assets/images/tabs/github.png', import.meta.url).href
  }
]
/** 顶部tab类型枚举 */
export enum TAB_TYPE {
  NORMAL = 'normal',
  ICON = 'icon',
  DROPDOWN = 'dropdown'
}
