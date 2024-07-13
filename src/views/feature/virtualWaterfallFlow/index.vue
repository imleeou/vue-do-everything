<script setup lang="ts">
import { ref, onMounted, onUnmounted, toRefs, watch, computed } from 'vue'
import { useDebounceFn, useScroll, useThrottleFn } from '@vueuse/core'
import { getUUID } from '@/utils'
import { WaterfallData2DType, WaterfallDataType } from './types'
import { generateRandomTitle, getColumnNum, getTextInfo } from './utils'

/** 瀑布流数据 */
const waterfallData = ref<WaterfallDataType[]>([])
/** 列数 */
const columnNum = ref(getColumnNum()),
  colRef = ref<HTMLDivElement[]>([]),
  containerRef = ref<HTMLDivElement>(),
  // 比较containerRef少了滚动条宽度
  ulRef = ref<HTMLDivElement>(),
  /** 多列对应的二维数组瀑布流数据 */
  multiColumnWaterfallData = ref<WaterfallData2DType[]>([]),
  /** 列间距 */
  COLUMN_GAP = 16,
  /** 瀑布流高度 */
  waterfallHeight = ref(0),
  /** 展示的数据id */
  viewPortDataIds = ref<number[]>([])

const { arrivedState, y: scrollY } = useScroll(containerRef)
const { bottom } = toRefs(arrivedState)

/** 当前视口的高度 */
const viewportHeight = computed(() => containerRef.value?.clientHeight || window.innerHeight)

/** 获取当前列的宽度 */
const colWidth = computed(() => {
  // 容器宽度
  const containerWidth = ulRef.value?.clientWidth || window.innerWidth
  return (containerWidth - (columnNum.value - 1) * COLUMN_GAP) / columnNum.value
})

watch(
  () => bottom.value,
  (value) => {
    if (value) {
      console.log('触底了..')
      // 触底加载数据
      loadMoreData()
    }
  }
)

/** 过滤当前在视口内的瀑布流数据 */
const getViewPortData = () => {
  // 视口数据条件：
  // 1、元素的上边界在视口内 2、元素只展示了一半，上边在视口外，下边在视口内
  // 优化：给上下边界 各添加 1/2 视口高度，避免白屏
  /** 上边界 */
  const topBorder = scrollY.value - viewportHeight.value / 2
  /** 下边界 */
  const bottomBorder = scrollY.value + viewportHeight.value + viewportHeight.value / 2
  viewPortDataIds.value = waterfallData.value
    .filter((item) => {
      return (
        (item.y >= topBorder && item.y <= bottomBorder) ||
        (item.y < topBorder && item.y + getElementTotalHeight(item) > topBorder)
      )
    })
    .map((item) => item.id)
}

/** 获取元素总高度 */
const getElementTotalHeight = (item: WaterfallDataType) => {
  /** 文本区域高度 */
  const { width } = getTextInfo(item.title)
  // 文本宽度，加上左右padding 8px
  const textWidth = width + 8
  // 超过列宽，添加两行高度
  const textHeight = textWidth > colWidth.value ? 50 : 30
  // 总高度 = 图片高度 + 文本高度 + gap:8px
  const totalHeight = item.height + textHeight + 8
  return totalHeight
}

/** 将瀑布流源数据处理成二维数据 */
const getWaterfallData2D = (newData?: WaterfallDataType[]) => {
  const result: WaterfallData2DType[] =
    multiColumnWaterfallData.value.length && multiColumnWaterfallData.value.length === columnNum.value && newData
      ? multiColumnWaterfallData.value
      : new Array(columnNum.value).fill(null).map(() => {
          return {
            uuid: getUUID(),
            height: 0,
            y: 0,
            data: []
          }
        })

  /** 需要添加的数据，没传则默认使用waterfallData全量数据 */
  const handleData = newData ?? waterfallData.value
  handleData.forEach((item) => {
    const totalHeight = getElementTotalHeight(item)
    // 首先查看是否有空列
    const emptyColIndex = result.findIndex((col) => col.height === 0)
    // 有空列
    if (emptyColIndex >= 0) {
      item.y = 0
      result[emptyColIndex].data.push(item)
      result[emptyColIndex].height = totalHeight
    }
    // 没有空列，则选择最小高度列
    else {
      // 找最小的height
      const minHeightColIndex = result.reduce((prev, curr, index) => {
        return curr.height < result[prev].height ? index : prev
      }, 0)
      // 该元素距离顶部距离
      item.y = result[minHeightColIndex].height
      result[minHeightColIndex].data.push(item)
      result[minHeightColIndex].height = result[minHeightColIndex].height + totalHeight
    }
  })
  multiColumnWaterfallData.value = [...result]
  // 保存最高列高度
  waterfallHeight.value = Math.max(...multiColumnWaterfallData.value.map((col) => col.height))
}

/** 窗口大小发生变化 */
const windowResize = useDebounceFn(() => {
  // scrollTop 置0
  containerRef.value?.scrollTo(0, 0)
  columnNum.value = getColumnNum()
  getWaterfallData2D()
  getViewPortData()
}, 100)

const loadMoreData = () => {
  const newData = new Array(100).fill(null).map((_, index) => {
    const idx = waterfallData.value.length + index + 1
    return {
      id: idx,
      title: `标题${idx}：` + generateRandomTitle(),
      background: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 100)}%)`,
      height: Math.floor(Math.random() * 200) + 100,
      y: 0
    }
  })
  waterfallData.value = [...waterfallData.value, ...newData]
  getWaterfallData2D(newData)
}

/** 滚动监听 */
const scrollListener = useThrottleFn(() => {
  getViewPortData()
}, 20)

const init = () => {
  loadMoreData()
}
init()

onMounted(() => {
  getViewPortData()
  // 添加窗口resize监听
  window.addEventListener('resize', windowResize)
  // 添加scroll监听
  containerRef.value?.addEventListener('scroll', scrollListener)
})

onUnmounted(() => {
  // 移除窗口resize监听
  window.removeEventListener('resize', windowResize)
  // 移除scroll监听
  containerRef.value?.removeEventListener('scroll', scrollListener)
})
</script>

<template>
  <div class="scroll-container" ref="containerRef" wh-full overflow-auto>
    <ul w-full flex flex-nowrap gap-4 ref="ulRef" :style="{ height: `${waterfallHeight}px` }">
      <!-- 列 -->
      <li
        v-for="colArray in multiColumnWaterfallData"
        class="col"
        ref="colRef"
        :key="colArray.uuid"
        flex-1
        h-full
        min-w-50
        flex
        flex-col
        gap-2
      >
        <template v-for="item in colArray.data" :key="item.id">
          <div
            v-if="viewPortDataIds.includes(item.id)"
            w-full
            class="col-child"
            :style="{ transform: `translateY(${item.y}px)` }"
          >
            <div w-full flex-center :style="{ backgroundColor: item.background, height: `${item.height}px` }">
              <span>{{ item.id }}</span>
              <span>-距离顶部：{{ item.y }}</span>
            </div>
            <div bg-gray-100 class="module-title">
              <p>{{ item.title }}</p>
            </div>
          </div>
        </template>
      </li>
    </ul>
  </div>
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

.col {
  position: relative;
  .col-child {
    position: absolute;
  }
}

.hide {
  opacity: 0;
}
</style>
