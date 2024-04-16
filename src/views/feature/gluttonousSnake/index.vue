<script setup lang="ts">
import { onMounted, ref, reactive, onUnmounted } from 'vue'
import { WIDTH, HEIGHT, DirectionEnum, GameStatusEnum, DIAMETER } from './constants'
import { getRandomInt } from './utils'

/** X轴最大坐标 */
const MaxX = WIDTH - DIAMETER,
  /** Y轴最大坐标 */
  maxY = HEIGHT - DIAMETER

/** 当前行进方向 */
const direction = ref(DirectionEnum.RIGHT),
  /** 当前游戏状态 */
  gameStatus = ref(GameStatusEnum.PENDING),
  /** 食物位置 */
  foodPosition = reactive({ x: getRandomInt(MaxX), y: getRandomInt(maxY) }),
  /** 蛇头位置 */
  snakeHeadPosition = reactive({ x: getRandomInt(MaxX), y: getRandomInt(maxY) }),
  /** 得分 / 蛇蛇的长度 */
  score = ref(0),
  /** 更新计时器 */
  timer = ref(),
  /** 计时器频率 / 游戏难度 / 行进速度 */
  speed = 200

/** 食物和蛇身直径 */
const bodyStyle = {
  width: `${DIAMETER}px`,
  height: `${DIAMETER}px`,
  transitionDuration: speed + 'ms'
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

/** 生成食物 */
const generateFood = () => {
  foodPosition.x = getRandomInt(MaxX)
  foodPosition.y = getRandomInt(maxY)
}

/** 开始游戏 */
const start = () => {
  timer.value = setInterval(() => {
    console.log('计时器执行', direction.value)
    // 更新位置
    switch (direction.value) {
      case DirectionEnum.UP:
        snakeHeadPosition.y -= DIAMETER
        break
      case DirectionEnum.DOWN:
        snakeHeadPosition.y += DIAMETER
        break
      case DirectionEnum.LEFT:
        snakeHeadPosition.x -= DIAMETER
        break
      case DirectionEnum.RIGHT:
        snakeHeadPosition.x += DIAMETER
        break
      default:
        break
    }

    // 检查是否碰壁
    if (checkCollision()) {
      gameStatus.value = GameStatusEnum.FINISHED
      clearTimer()
      return
    }

    // 检查是否吃到食物
    if (snakeHeadPosition.x === foodPosition.x && snakeHeadPosition.y === foodPosition.y) {
      // 吃到食物，加长蛇身
      score.value += 1
      // 重新生成食物
      generateFood()
    }

    console.log('更新后的位置->', snakeHeadPosition.x, snakeHeadPosition.y)
  }, speed)
}

/** 检查蛇头是否碰壁或者碰到身体 */
const checkCollision = (): boolean => {
  // 是否碰壁？
  if (snakeHeadPosition.x < 0 || snakeHeadPosition.x > MaxX || snakeHeadPosition.y < 0 || snakeHeadPosition.y > maxY) {
    return true
  }
  // 是否碰到身体？ 
  //TODO： 改造数据保存

  return false
}

/** 暂停游戏 */
const paused = () => {
  clearTimer()
}

/** 更改行进方向 */
const updateDirection = (dir: DirectionEnum) => {
  console.log('updateDirection', dir)
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
          :style="{ ...bodyStyle, top: `${foodPosition.y}px`, left: `${foodPosition.x}px` }"
        ></div>
        <!-- 蛇 -->
        <ul list-none>
          <li
            rounded-full
            absolute
            bg-blue-500
            class="snake-body"
            :style="{ ...bodyStyle, top: `${snakeHeadPosition.y}px`, left: `${snakeHeadPosition.x}px` }"
          ></li>
          <template v-if="score">
            <li
              v-for="index in score"
              :key="index"
              class="snake-body"
              :style="{
                ...bodyStyle,
                top: `${snakeHeadPosition.y + index * DIAMETER}px`,
                left: `${snakeHeadPosition.x + index * DIAMETER}px`
              }"
            ></li>
          </template>
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
