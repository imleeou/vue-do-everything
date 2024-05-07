<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { WaterfallData2DType, WaterfallDataType } from './types'
import { generateRandomTitle } from './utils'

/** 瀑布流数据 */
const waterfallData = ref<WaterfallDataType[]>([])
/** 列数 */
const columnNum = ref(6),
  colRef = ref<HTMLDivElement[]>([])

/** 多列对应的二维数组瀑布流数据 */
const multiColumnWaterfallData = computed((): WaterfallData2DType[] => {
  const result: WaterfallData2DType[] = new Array(columnNum.value).fill(null).map(() => {
    return {
      height: 0,
      data: []
    }
  })
  waterfallData.value.forEach((item, index) => {
    // 找到最小的height,若相同则选择最前面的
    // 首先查看是否有空列
    const emptyColIndex = result.findIndex((col) => col.height === 0)
    if (emptyColIndex >= 0) {
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
})

const init = () => {
  waterfallData.value = new Array(100).fill(null).map((_, index) => {
    return {
      id: index,
      title: `标题${index}：` + generateRandomTitle(),
      background: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 100)}%)`,
      width: Math.floor(Math.random() * 200) + 100,
      height: Math.floor(Math.random() * 200) + 100
    }
  })
  console.log('[ waterfallData.value ] >', waterfallData.value)
  console.log('[ multiColumnWaterfallData ] >', multiColumnWaterfallData.value)
}

init()
/** 窗口大小发生变化 */
const windowResize = () => {
  console.log('resize')
}
onMounted(() => {
  // 添加窗口resize监听
  window.addEventListener('resize', windowResize)
})

onUnmounted(() => {
  // 移除窗口resize监听
  window.removeEventListener('resize', windowResize)
})
</script>

<template>
  <ul wh-full flex flex-nowrap>
    <!-- 列 -->
    <li v-for="(colArray, index) in multiColumnWaterfallData" ref="colRef" :key="index">
      <div v-for="(item, index) in colArray.data" :key="index" mx-1 my-4>
        <div :style="{ backgroundColor: item.background, height: `${item.height}px` }">{{ item.id }}</div>
        <p mt-1 px-1 py-2 bg-gray-100 class="text-ellipsis">{{ item.title }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
