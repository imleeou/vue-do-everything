<script setup lang="ts">
import { ref, onMounted } from 'vue'
const canvasBg = ref<HTMLCanvasElement | null>(null)
const backGround = ref<HTMLDivElement | null>(null)
/** canvas 的上下文 */
let ctx = ref<CanvasRenderingContext2D | null>(null)
/** 设置每一列的宽度 */
const colWidth = 40
/** 保存总列数 */
let colNum = ref(0)
/** 保存总行数 */
let rowNum = ref(0)
/** 设置字体大小 */
const FONT_SIZE = 14
/** 保存每一列渲染的次数 */
let colRenderTimes = ref<number[]>([])
/** 渲染的计时器 */
const renderTimer = ref<NodeJS.Timer | null>(null)
/** 渲染的速度 */
const RENDER_SPEED = 100
/** 首次渲染标记 */
let firstRender = ref(true)

/** 获取随机字符串 */
const getRandomChar = () => {
  const char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890%$#@!&*'
  return char[Math.floor(Math.random() * char.length)]
}
/** 获取随机颜色 */
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return `rgb(${r},${g},${b})`
}

/** 绘制 */
const draw = () => {
  if (ctx.value) {
    // 第一次渲染不设置透明度
    ctx.value.fillStyle = !firstRender.value ? `rgba(0, 0, 0, 0.1)` : `rgba(0, 0, 0, 1)`
    ctx.value.fillRect(0, 0, window.innerWidth, window.innerHeight)
    firstRender.value = false
    /* 循环列数次，同时每次计算出xy的坐标 */
    for (let i = 1; i < colNum.value; i++) {
      const x = i * colWidth
      const y = colRenderTimes.value[i] * FONT_SIZE
      // 当渲染高度大于视图高度时，重置渲染行数
      if (y > window.innerHeight && Math.random() > 0.9) {
        colRenderTimes.value[i] = 1
      }
      ctx.value.fillStyle = getRandomColor()
      /* 绘制 三个参数分别是 字符  x坐标 y坐标 */
      ctx.value.font = `${FONT_SIZE}px serif`
      ctx.value.textAlign = 'center'
      ctx.value.fillText(getRandomChar(), x, y)
      /** 绘制完成当前列渲染数 +1 */
      colRenderTimes.value[i]++
    }
  }
}

const init = () => {
  const backGroundWidth = backGround.value?.clientWidth || 0
  canvasBg.value?.setAttribute('width', backGroundWidth + 'px')
  canvasBg.value?.setAttribute('height', backGround.value?.clientHeight + 'px')
  ctx.value = canvasBg.value ? canvasBg.value.getContext('2d') : null
  colNum.value = Math.floor(backGroundWidth / colWidth) + 2
  rowNum.value = Math.floor(window.innerHeight / FONT_SIZE)
  colRenderTimes.value = new Array(colNum.value).fill(1)
  colRenderTimes.value.forEach((_item, index) => {
    colRenderTimes.value[index] = Math.floor(Math.random() * rowNum.value)
  })
  renderTimer.value = setInterval(draw, RENDER_SPEED)
}
onMounted(init)
</script>

<template>
  <div class="back-ground" ref="backGround">
    <canvas class="nice-bg" ref="canvasBg"></canvas>
    <main class="main"><slot></slot></main>
  </div>
</template>

<style scoped lang="less">
.back-ground {
  width: 100vw;
  min-height: 100vh;
  background-color: #fafafa;
  position: relative;
  z-index: -1;
  .nice-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 0;
  }
  .main {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
  }
}
</style>
