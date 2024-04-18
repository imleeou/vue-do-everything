<script setup lang="ts">
import { onMounted, ref, reactive, onUnmounted, computed } from 'vue'
import { WIDTH, HEIGHT, DirectionEnum, GameStatusEnum, DIAMETER } from './constants'
import { getRandomInt, getUUID } from './utils'
import type { SnakeDataType } from './types'

/** X轴最大坐标 */
const MaxX = WIDTH - DIAMETER,
  /** Y轴最大坐标 */
  maxY = HEIGHT - DIAMETER,
  /** DirectionEnum的所有枚举 */
  DIRS = Object.values(DirectionEnum)

/** 当前行进方向 */
const direction = ref(DIRS[Math.floor(Math.random() * DIRS.length)]),
  /** 当前游戏状态 */
  gameStatus = ref(GameStatusEnum.PENDING),
  /** 食物位置 */
  foodPosition = ref({ x: getRandomInt(MaxX), y: getRandomInt(maxY) }),
  /** 蛇蛇数据 */
  snakeBodyData = ref<SnakeDataType[]>([{ x: getRandomInt(MaxX), y: getRandomInt(maxY), uuid: getUUID() }]),
  /** 得分 / 蛇蛇的长度 */
  score = ref(0),
  /** 更新计时器 */
  timer = ref(),
  /** 计时器频率 / 游戏难度 / 行进速度 */
  speed = 100,
  /** 游戏总时间，单位：毫秒 */
  totalTime = ref(0)

/** 食物和蛇身直径 */
const bodyStyle = {
  width: `${DIAMETER}px`,
  height: `${DIAMETER}px`,
  transitionDuration: speed + 'ms'
}

/** 蛇头位置 */
const snakeHeadPosition = computed(() => snakeBodyData.value[0])

/** 将总时长(毫秒)转换为 分秒 */
const formatTotalTime = computed(() => {
  const totalSeconds = Math.floor(totalTime.value / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

/** 重置游戏数据 */
const resetGame = () => {
  // 方向重置为任意值
  direction.value = DIRS[Math.floor(Math.random() * DIRS.length)]
  // 蛇蛇数据重置
  snakeBodyData.value = [{ x: getRandomInt(MaxX), y: getRandomInt(maxY), uuid: getUUID() }]
  // 食物位置重置
  foodPosition.value = { ...generatePosition() }
  // 得分重置
  score.value = 0
  // 总时长重置
  totalTime.value = 0
}

/** 处理按下空格键 */
const handlePressSpace = () => {
  switch (gameStatus.value) {
    case GameStatusEnum.PENDING:
      gameStatus.value = GameStatusEnum.RUNNING
      start()
      break
    case GameStatusEnum.RUNNING:
      gameStatus.value = GameStatusEnum.PAUSED
      paused()
      break
    case GameStatusEnum.PAUSED:
      gameStatus.value = GameStatusEnum.RUNNING
      start()
      break
    case GameStatusEnum.FINISHED:
      gameStatus.value = GameStatusEnum.PENDING
      resetGame()
      break
    default:
      break
  }
}

/** 清除计时器 */
const clearTimer = () => {
  clearInterval(timer.value)
  timer.value = undefined
}

/** 生成新的坐标 */
const generatePosition = () => {
  return {
    x: getRandomInt(MaxX),
    y: getRandomInt(maxY)
  }
}

/** 更新位置 */
const updatePosition = () => {
  // 旧的头部位置
  const oldHeadPosition = { ...snakeBodyData.value[0] }
  // 保存一份新的头部位置
  switch (direction.value) {
    case DirectionEnum.UP:
      oldHeadPosition.y -= DIAMETER
      break
    case DirectionEnum.DOWN:
      oldHeadPosition.y += DIAMETER
      break
    case DirectionEnum.LEFT:
      oldHeadPosition.x -= DIAMETER
      break
    case DirectionEnum.RIGHT:
      oldHeadPosition.x += DIAMETER
      break
    default:
      break
  }

  // 蛇身位置更新
  snakeBodyData.value.forEach((_, index) => {
    if (snakeBodyData.value.length - 1 - index === 0) return
    // 从后往前开始更新
    const behind = snakeBodyData.value[snakeBodyData.value.length - 1 - index]
    const front = snakeBodyData.value[snakeBodyData.value.length - 2 - index]
    behind.x = front.x
    behind.y = front.y
  })

  // 新的头部位置
  snakeBodyData.value[0] = { ...oldHeadPosition }
}

/** 开始游戏 */
const start = () => {
  timer.value = setInterval(() => {
    // 更新位置
    updatePosition()

    // 检查是否碰壁
    if (checkCollision()) {
      gameStatus.value = GameStatusEnum.FINISHED
      clearTimer()
      return
    }

    // 检查是否吃到食物
    if (snakeHeadPosition.value.x === foodPosition.value.x && snakeHeadPosition.value.y === foodPosition.value.y) {
      // 吃到食物，得分加一
      score.value += 1
      // 重新生成食物
      foodPosition.value = { ...generatePosition() }
      // 增加蛇身
      snakeBodyData.value.push({
        x: snakeBodyData.value[snakeBodyData.value.length - 1].x,
        y: snakeBodyData.value[snakeBodyData.value.length - 1].y,
        uuid: getUUID()
      })
    }

    // 更新游戏时间
    totalTime.value += speed
  }, speed)
}

/** 检查蛇头是否碰壁或者碰到身体 */
const checkCollision = (): boolean => {
  // 是否碰壁？
  if (
    snakeHeadPosition.value.x < 0 ||
    snakeHeadPosition.value.x > MaxX ||
    snakeHeadPosition.value.y < 0 ||
    snakeHeadPosition.value.y > maxY
  ) {
    return true
  }
  // 是否碰到身体？
  const bodyCollision = snakeBodyData.value.find(
    (body, index) => index !== 0 && body.x === snakeHeadPosition.value.x && body.y === snakeHeadPosition.value.y
  )

  return !!bodyCollision
}

/** 暂停游戏 */
const paused = () => {
  clearTimer()
}

/** 更改行进方向 */
const updateDirection = (dir: DirectionEnum) => {
  // 禁止反向行进
  if (
    (dir === DirectionEnum.LEFT && direction.value === DirectionEnum.RIGHT) ||
    (dir === DirectionEnum.RIGHT && direction.value === DirectionEnum.LEFT) ||
    (dir === DirectionEnum.UP && direction.value === DirectionEnum.DOWN) ||
    (dir === DirectionEnum.DOWN && direction.value === DirectionEnum.UP)
  ) {
    return
  }

  direction.value = dir
}

onMounted(() => {
  document.addEventListener('keydown', (event) => {
    const controlKeys = Object.values(DirectionEnum)
    // 按下空格键
    if (event.code === 'Space') {
      handlePressSpace()
    } else if (controlKeys.includes(event.code as DirectionEnum)) {
      updateDirection(event.code as DirectionEnum)
    }
  })
})

onUnmounted(() => {
  clearTimer()
})
</script>

<template>
  <div wh-full flex-center flex-col>
    <!-- 说明 -->
    <header text-center :style="{ width: `${WIDTH}px` }" my-2>
      <div flex justify-between items-center>
        <p>⬆️⬇️⬅️➡️：上下左右</p>
        <p m-2>
          <span class="key-board" w-10><i class="i-mdi-keyboard-space" /></span>：开始/暂停/继续
        </p>
      </div>
      <div flex justify-between>
        <p>游戏时间：{{ formatTotalTime }}</p>
        <p>得分：{{ score }}</p>
      </div>
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
        <!-- 未开始 -->
        <template v-if="gameStatus === GameStatusEnum.PENDING">
          <p text-center>
            按空格键（<span class="key-board" w-10><i class="i-mdi-keyboard-space" /></span>）开始游戏
          </p>
        </template>
        <!-- 暂停 -->
        <template v-if="gameStatus === GameStatusEnum.PAUSED">
          <p text-center>游戏暂停</p>
        </template>
        <!-- 结束 -->
        <template v-if="gameStatus === GameStatusEnum.FINISHED">
          <p text-center>游戏结束</p>
        </template>
      </div>
      <!-- 游戏内容 -->
      <div wh-full>
        <!-- 食物 -->
        <div
          rounded-full
          absolute
          bg-red-500
          :style="{ ...bodyStyle, top: `${foodPosition.y}px`, left: `${foodPosition.x}px`, transitionProperty: 'none' }"
        ></div>
        <!-- 蛇 -->
        <ul list-none>
          <!-- <li
            rounded-full
            absolute
            bg-blue-500
            class="snake-body"
            :style="{ ...bodyStyle, top: `${snakeHeadPosition.y}px`, left: `${snakeHeadPosition.x}px` }"
          ></li> -->
          <li
            v-for="(body, index) in snakeBodyData"
            rounded-full
            absolute
            :key="body.uuid"
            :class="['snake-body', index === 0 ? 'bg-blue-500' : 'bg-gray-300']"
            :style="{
              ...bodyStyle,
              top: `${body.y}px`,
              left: `${body.x}px`
            }"
          ></li>
        </ul>
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

.snake-body {
  transition: all;
  transition-timing-function: linear;
}
</style>
