<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** 是否全屏loading */
    full?: boolean
    /** 辐射半径 */
    size?: number
  }>(),
  {
    full: false,
    size: 80
  }
)

const loadingStyle = computed(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size}px`
  }
})
</script>

<template>
  <div :class="['diffuse-loading', full && 'full']" wh-full flex-center>
    <div class="core" :style="loadingStyle">
      <div class="core-inner" v-for="n in 4" :key="n" :style="{ '--n': n }">
        <span
          v-for="index in 20"
          :key="index"
          :style="{ '--i': index, '--size': props.size + 'px', left: `-${props.size}px` }"
        ></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@keyframes animate {
  0% {
    transform: scale(1);
    opacity: 0;
    left: 100%;
  }

  10% {
    opacity: 1;
  }

  80% {
    opacity: 1;
  }

  100% {
    transform: scale(0);
    opacity: 1;
    left: 0;
  }
}
.diffuse-loading {
  .core {
    @apply relative flex-center;
    .core-inner {
      @apply relative;
      transform: rotate(calc(var(--n) * 45deg));
      > span {
        @apply h-1 inline-block absolute origin-right top-0;
        width: var(--size);
        transform: rotate(calc(var(--i) * 18deg));
        &::before {
          content: '';
          display: block;
          width: 10%;
          height: calc(var(--size) * 0.1);
          background-color: var(--theme-color);
          border-radius: 100%;
          box-shadow: 0 0 10px var(--theme-color), 0 0 20px var(--theme-color), 0 0 40px var(--theme-color),
            0 0 60px var(--theme-color), 0 0 80px var(--theme-color), 0 0 100px var(--theme-color);
          animation: animate 5s linear infinite;
          animation-delay: calc(-0.5s * var(--i));
          position: absolute;
          left: 0;
        }
      }
    }
  }
  &.full {
    @apply wh-screen fixed top-0 left-0 z-1000;
  }
}
</style>
