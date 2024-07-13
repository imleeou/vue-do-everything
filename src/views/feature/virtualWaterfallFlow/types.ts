/** 瀑布流数据类型 */
export interface WaterfallDataType {
  id: number
  title: string
  // width: number
  /** 不包括标题的高度 */
  height: number
  background: string
  /** 元素距离顶部的距离 */
  y: number
}

/** 二维瀑布流数据类型 */
export interface WaterfallData2DType {
  uuid: string
  height: number
  data: WaterfallDataType[]
}
