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
  console.log(
    `💡 ~ getColWidth ~ containerWidth -> `,
    containerRef.value,
    containerRef.value?.clientWidth,
    containerWidth
  )
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
    // 找到最小的height,若相同则选择最前面的
    // 首先查看是否有空列
    const emptyColIndex = result.findIndex((col) => col.height === 0)
    if (emptyColIndex >= 0) {
      const { width } = getTextInfo(item.title)
      // TODO: 支持动态两行文本高度
      // 文本宽度，加上padding，检查是否超过列宽，超过列宽添加两行高度
      const textWidth = width + 8
      console.log(`💡 ~ waterfallData.value.forEach ~ textWidth -> `, item.title, textWidth)
      console.log(`💡 ~ multiColumnWaterfallData ~ colWidth -> `, colWidth)
      result[emptyColIndex].data.push(item)
      result[emptyColIndex].height = item.height
    } else {
      // 找最小的height
      const minHeightColIndex = result.reduce((prev, curr, index) => {
        return curr.height < result[prev].height ? index : prev
      }, 0)
      result[minHeightColIndex].data.push(item)
      result[minHeightColIndex].height = result[minHeightColIndex].height + item.height
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
      title: `标题${index}：` + generateRandomTitle(),
      background: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 100)}%)`,
      width: Math.floor(Math.random() * 200) + 100,
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
        <p px-1 py-2 bg-gray-100 class="text-ellipsis">{{ item.title }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
