<script setup lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import { WIDTH, HEIGHT, DirectionEnum, GameStatusEnum, DIAMETER } from './constants'

/** X轴最大坐标 */
const MaxX = WIDTH - DIAMETER,
  /** Y轴最大坐标 */
  maxY = HEIGHT - DIAMETER

/** 当前行进方向 */
const direction = ref(DirectionEnum.RIGHT),
  /** 当前游戏状态 */
  gameStatus = ref(GameStatusEnum.PENDING),
  /** 食物位置 */
  foodPosition = reactive({ x: 690, y: 0 })

/** 食物样式 */
const foodStyle = computed(() => {
  return {
    width: `${DIAMETER}px`,
    height: `${DIAMETER}px`,
    top: `${foodPosition.y}px`,
    left: ` ${foodPosition.x}px`
  }
})

/** 处理按下空格键 */
const handlePressSpace = () => {
  console.log('handlePressSpace')
  switch (gameStatus.value) {
    case GameStatusEnum.PENDING:
      gameStatus.value = GameStatusEnum.RUNNING
      break
    case GameStatusEnum.RUNNING:
      gameStatus.value = GameStatusEnum.PAUSED
      break
    case GameStatusEnum.PAUSED:
      gameStatus.value = GameStatusEnum.RUNNING
      break
    case GameStatusEnum.FINISHED:
      gameStatus.value = GameStatusEnum.PENDING
      break
    default:
      break
  }
}

/** 更改行进方向 */
const updateDirection = (dir: DirectionEnum) => {
  console.log('updateDirection', dir)
  direction.value = dir
}

onMounted(() => {
  document.addEventListener('keydown', (event) => {
    const controlKeys = Object.values(DirectionEnum)
    console.log('event', event)
    // 按下空格键
    if (event.code === 'Space') {
      handlePressSpace()
    } else if (controlKeys.includes(event.code as DirectionEnum)) {
      updateDirection(event.code as DirectionEnum)
    }
  })
})
</script>

<template>
  <div wh-full flex-center flex-col>
    <!-- 说明 -->
    <header text-center>
      <p>控制：⬆️⬇️⬅️➡️</p>
      <p m-2>
        空格键（<span class="key-board" w-10><i class="i-mdi-keyboard-space" /></span>）：开始/暂停/继续
      </p>
    </header>
    <!-- 游戏窗口 -->
    <div :style="{ width: `${WIDTH}px`, height: `${HEIGHT}px` }" relative box-content border="1 solid black">
      <!-- 蒙版 - 未开始/暂停/结束时显示 -->
      <div
        v-if="gameStatus !== GameStatusEnum.RUNNING"
        wh-full
        absolute
        top-0
        left-0
        flex-center
        class="bg-black/40 z-[9999]"
      >
        <template v-if="gameStatus === GameStatusEnum.PENDING">
          <p text-center>
            按空格键（<span class="key-board" w-10><i class="i-mdi-keyboard-space" /></span>）开始游戏
          </p>
        </template>
      </div>
      <!-- 游戏内容 -->
      <div wh-full>
        <!-- 食物 -->
        <div rounded absolute bg-red-500 :style="foodStyle"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.key-board {
  background-color: #0078d7;
  border-radius: 1px;
  border: 1px solid black;
  color: white;
  display: inline-block;
  box-sizing: border-box;
  height: 18px;
  line-height: 18px;
  text-align: center;
}
</style>
