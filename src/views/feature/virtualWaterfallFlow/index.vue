<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { WaterfallData2DType, WaterfallDataType } from './types'
import { generateRandomTitle, getColumnNum, getTextInfo } from './utils'

/** 瀑布流数据 */
const waterfallData = ref<WaterfallDataType[]>([])
/** 列数 */
const columnNum = ref(getColumnNum()),
  colRef = ref<HTMLDivElement[]>([]),
  containerRef = ref<HTMLDivElement>(),
  /** 多列对应的二维数组瀑布流数据 */
  multiColumnWaterfallData = ref<WaterfallData2DType[]>([]),
  /** 列间距 */
  columnGap = ref(8)

/** 获取当前列的宽度 */
const getColWidth = () => {
  // 容器宽度
  const containerWidth = containerRef.value?.clientWidth || window.innerWidth
  return (containerWidth - columnNum.value * columnGap.value) / columnNum.value
}

/** 将瀑布流源数据处理成二维数据 */
const getWaterfallData2D = () => {
  const result: WaterfallData2DType[] = new Array(columnNum.value).fill(null).map(() => {
    return {
      height: 0,
      data: []
    }
  })
  /** 当前列宽 */
  const colWidth = getColWidth()
  waterfallData.value.forEach((item) => {
    /** 文本区域高度 */
    const { width } = getTextInfo(item.title)
    // 文本宽度，加上左右padding 8px
    const textWidth = width + 8
    // 超过列宽，添加两行高度
    const textHeight = textWidth > colWidth ? 50 : 30
    // 总高度
    const totalHeight = item.height + textHeight

    // 首先查看是否有空列
    const emptyColIndex = result.findIndex((col) => col.height === 0)
    // 有空列
    if (emptyColIndex >= 0) {
      result[emptyColIndex].data.push(item)
      result[emptyColIndex].height = totalHeight
    }
    // 没有空列，则选择最小高度列
    else {
      // 找最小的height
      const minHeightColIndex = result.reduce((prev, curr, index) => {
        return curr.height < result[prev].height ? index : prev
      }, 0)
      result[minHeightColIndex].data.push(item)
      result[minHeightColIndex].height = result[minHeightColIndex].height + totalHeight
    }
  })
  return result
}

/** 窗口大小发生变化 */
const windowResize = useDebounceFn(() => {
  columnNum.value = getColumnNum()
  multiColumnWaterfallData.value = getWaterfallData2D()
}, 100)

const init = () => {
  waterfallData.value = new Array(100).fill(null).map((_, index) => {
    return {
      id: index + 1,
      title: `标题${index + 1}：` + generateRandomTitle(),
      background: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 100)}%)`,
      // width: Math.floor(Math.random() * 200) + 100,
      height: Math.floor(Math.random() * 200) + 100
    }
  })
}

init()

onMounted(() => {
  multiColumnWaterfallData.value = getWaterfallData2D()
  // 添加窗口resize监听
  window.addEventListener('resize', windowResize)
})

onUnmounted(() => {
  // 移除窗口resize监听
  window.removeEventListener('resize', windowResize)
})
</script>

<template>
  <ul wh-full flex flex-nowrap gap-4 overflow-auto ref="containerRef" class="hide-scrollbar">
    <!-- 列 -->
    <li
      v-for="(colArray, index) in multiColumnWaterfallData"
      ref="colRef"
      :key="index"
      flex-1
      min-w-50
      flex
      flex-col
      gap-2
    >
      <div v-for="item in colArray.data" :key="item.id" w-full>
        <div w-full :style="{ backgroundColor: item.background, height: `${item.height}px` }">{{ item.id }}</div>
        <div bg-gray-100 class="module-title">
          <p>{{ item.title }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="less">
.module-title {
  font-size: 14px;

  line-height: 1.4;
  min-height: 30px;
  max-height: 50px;
  padding: 5px 4px;
  > p {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
}
</style>
