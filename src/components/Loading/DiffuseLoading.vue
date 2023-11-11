<script setup lang="ts">
/** 点点数量 */
const COUNT = 80

const getStyle = (index: number) => {
  return {
    transform: `rotate(calc(${index} * 45deg))`
  }
}
</script>

<template>
  <div class="diffuse-loading" wh-full flex-center>
    <ul class="content">
      <li class="dot" :style="getStyle(index)" v-for="index in COUNT" :key="index"></li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.diffuse-loading {
  .content {
    @apply w-40 h-40 list-none relative;
    .dot {
      @apply w-4 h-4 rounded-full bg-lime-200 absolute top-18 left-18;
    }
  }
}
</style>
