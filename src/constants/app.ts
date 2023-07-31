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
    name: '小玩意',
    type: TabTypeEnum.DROPDOWN,
    children: [
      {
        path: '/game',
        name: '游戏',
        type: TabTypeEnum.NORMAL
      },
      {
        path: '/feature/randomName',
        name: '随机点名',
        type: TabTypeEnum.NORMAL
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
