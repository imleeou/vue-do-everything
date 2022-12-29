/** normal tab */
interface NormalTabType {
  path: string
  name: string
  type: 'normal'
}
/** icon tab */
interface IconTabType {
  link: string
  icon: string
  type: 'icon'
}
/** dropdown tab */
interface DropdownTabType {
  name: string
  type: 'dropdown'
  children: NormalTabType[]
}
/** 顶部tab */
export type TabType = IconTabType | NormalTabType | DropdownTabType
