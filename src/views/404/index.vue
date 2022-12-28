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
      <!-- 电线 -->
      <div class="wire"></div>
      <!-- 灯罩 -->
      <div class="lampshade"></div>
      <!-- 灯泡 -->
      <div class="light-bulb"></div>
      <!-- 光线 -->
      <div class="light"></div>
    </div>
    <div class="tip">
      <h2>页面走丢啦</h2>
      <p>请检查您的访问地址是否正确</p>
    </div>
    <div class="operation">
      <button @click="back">返回首页</button>
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
  background-color: rgba(0, 0, 0, 1);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  :deep(.star-container) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
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
  & > * {
    z-index: 1;
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
    animation: lamp 8s infinite;
    animation-timing-function: cubic-bezier(0.6, 0, 0.38, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    transform-origin: center top;
    position: fixed;
    top: 0;
    > * {
      z-index: 1;
    }
    .wire {
      width: 8px;
      height: 16vh;
      background-image: linear-gradient(rgb(32 148 218 / 70%), rgb(193 65 25)),
        linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
    }
    .lampshade {
      width: 180px;
      height: 70px;
      background-color: rgb(0, 202, 202);
      border-radius: 40px 40px 0 0;
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 10%;
        background-color: #fff;
        border-radius: 0 0 100% 100%;
        position: absolute;
        bottom: -7px;
      }
    }
    .light-bulb {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: rgb(225, 227, 161);
      margin-top: -8px;
      box-shadow: 0 30px 100px 20px rgba(225, 227, 161, 80%);
      z-index: 0;
    }
    .light {
      width: 280px;
      height: 0;
      border-bottom: 900px solid rgba(255, 255, 243, 0.324);
      border-image: linear;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      z-index: 1;
      margin-top: -25px;
    }
  }

  .tip {
    color: #000;
    position: relative;
    z-index: 9;
    h2 {
      font-size: 100px;
    }
    p {
      font-size: 40px;
    }
  }

  .operation {
    position: absolute;
    right: 10%;
    top: 5%;
    button {
      width: 100px;
      height: 100px;
      cursor: pointer;
      background-image: url('@/assets/images/layout/moon.jpeg');
      color: #fff;
      background-position: center center;
      background-repeat: no-repeat;
      border-radius: 100%;
      background-size: 108% 108%;
      border: none;
      font-weight: bold;
    }
  }
}
</style>
