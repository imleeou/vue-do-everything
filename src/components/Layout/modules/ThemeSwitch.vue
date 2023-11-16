<script setup lang="ts">
import { nextTick } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  disableTransition: false
})
const toggleDark = useToggle(isDark)

/** 过渡动画 */
let resolveFn: (value: boolean | PromiseLike<boolean>) => void
const switchClick = (event: MouseEvent) => {
  const isAppearanceTransition =
    // @ts-expect-error
    document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!isAppearanceTransition || !event) {
    resolveFn(true)
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    resolveFn(true)
    await nextTick()
  })
  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)'
      }
    )
  })
}

const beforeChange = (): Promise<boolean> => {
  return new Promise((resolve) => {
    resolveFn = resolve
  })
}
</script>

<template>
  <el-switch
    v-model="isDark"
    :class="['theme-switch', isDark && 'dark-switch']"
    inline-prompt
    :active-icon="Moon"
    :inactive-icon="Sunny"
    :before-change="beforeChange"
    @click="switchClick"
    @change="toggleDark"
  ></el-switch>
</template>

<style lang="less" scoped>
// 浅色
@light: #e0e0e0;
// 深色
@dark: #48484a;
.el-switch {
  --el-switch-off-color: @light;
  --el-switch-on-color: @dark;
}
.theme-switch {
  --el-switch-border-color: @dark;
  :deep(.el-switch__inner) .el-icon {
    color: @dark;
    font-size: 14px;
  }

  // 明亮
  :deep(.el-switch__action) {
    background-color: #fff;
  }

  // 暗黑
  &.dark-switch {
    --el-switch-border-color: @light;
    :deep(.el-switch__inner) .el-icon {
      color: @light;
    }

    :deep(.el-switch__action) {
      background-color: #333;
      box-shadow: 0 0 0 1px #e0e0e020;
    }
  }
}
</style>
