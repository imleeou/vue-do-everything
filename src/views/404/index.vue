<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
/** 页面dom ref */
const notFoundDom = ref<HTMLDivElement | null>(null)
const back = () => {
  router.replace('/')
}

/** 星星初始数量 */
const starCount = 99
/** 生成星星 */
const createStar = () => {
  const starContainer = document.createElement('div')
  starContainer.className = 'star-container'
  // 生成 100个星星
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('span')
    star.className = 'star'
    // 设置star的位置
    star.style.left = Math.random() * 100 + '%'
    star.style.top = Math.random() * 100 + '%'
    // 设置star的动画延迟
    star.style.animationDelay = Math.random() * 4 + 's'
    starContainer.appendChild(star)
  }
  notFoundDom.value?.appendChild(starContainer)
}

onMounted(() => {
  createStar()
})
</script>

<template>
  <div class="not-found" ref="notFoundDom">
    <div class="lamp">
      <div class="wire"></div>
      <div class="page-404">404</div>
      <button @click="back">GO HOME</button>
    </div>
  </div>
</template>

<style scoped lang="less">
@keyframes star {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}
.not-found {
  width: 100%;
  min-height: 100vh;
  background-color: #000;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  :deep(.star-container) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    .star {
      width: 2px;
      height: 2px;
      background-color: #fff;
      display: block;
      position: absolute;
      animation: star 3s linear infinite;
      opacity: 0.1;
    }
  }

  // 灯的旋转动画
  @keyframes lamp {
    0% {
      transform: rotate(40deg);
    }
    50% {
      transform: rotate(-40deg);
    }
    100% {
      transform: rotate(40deg);
    }
  }

  .lamp {
    margin: 0 auto;
    margin-top: -2px;
    animation: lamp 5s infinite;
    animation-timing-function: cubic-bezier(0.6, 0, 0.38, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    transform-origin: center top;
    .wire {
      width: 8px;
      height: 12vh;
      background-image: linear-gradient(rgb(32 148 218 / 70%), rgb(193 65 25)),
        linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
    }
  }
}
</style>
