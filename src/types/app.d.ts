import { TabTypeEnum } from '@/constants/enum'
/** normal tab */
interface NormalTabType {
  path: string
  name: string
  type: TabTypeEnum.NORMAL
}
/** icon tab */
interface IconTabType {
  link: string
  path?: string
  icon: string
  type: TabTypeEnum.ICON
}
/** dropdown tab */
interface DropdownTabType {
  name: string
  type: TabTypeEnum.DROPDOWN
  children: NormalTabType[]
}

/** 顶部tab */
export type TabType = IconTabType | NormalTabType | DropdownTabType
