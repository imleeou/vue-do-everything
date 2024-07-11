/** 瀑布流数据类型 */
export interface WaterfallDataType {
  id: number
  title: string
  // width: number
  /** 不包括标题的高度 */
  height: number
  background: string
}


/** 二维瀑布流数据类型 */
export interface WaterfallData2DType {
  height: number;
  data: WaterfallDataType[];
}