<script setup lang="ts">
/** 点点数量 */
const COUNT = 10
/** 圈数 */
const ROUND = 4

const getPathStyle = (index: number, roundIndex: number) => {
  return {
    transform: `rotate(calc(${index} * ${360 / COUNT}deg))`,
    animationDelay: `${(roundIndex - 1) * 1}s`
  }
}
</script>

<template>
  <div class="diffuse-loading" wh-full flex-center>
    <div class="core">
      <ul class="content" v-for="num in ROUND" :key="num">
        <li class="path" :style="getPathStyle(index, num)" v-for="index in COUNT" :key="index"></li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
@keyframes dotAni {
  0% {
    opacity: 1;
    right: -0.75rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  100% {
    opacity: 0.5;
    right: 5.75rem;
    width: 0;
    height: 0;
  }
}

@keyframes contentRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.diffuse-loading {
  .core {
    @apply w-40 h-40 list-none relative flex-center;
    .content {
      @apply wh-full origin-center list-none;
      .path {
        @apply w-20 h-1 origin-right  absolute left-0 top-1/2;
      }
      .path::after {
        content: '';
        // @apply w-4 h-4 rounded-full bg-lime-200 block content-none;
        width: 1.5rem;
        height: 1.5rem;
        content: '';
        display: inline-block;
        border-radius: 100%;
        background-color: #87d0f5;
        position: absolute;
        right: -0.75rem;
        top: 50%;
        transform: translateY(-50%);
        animation: dotAni 3s linear infinite forwards;
        animation-delay: inherit;
      }
    }
  }
}
</style>
