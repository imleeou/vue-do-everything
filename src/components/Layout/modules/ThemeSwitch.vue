<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  disableTransition: false
})
const toggleDark = useToggle(isDark)
</script>

<template>
  <el-switch
    v-model="isDark"
    :class="['theme-switch', isDark && 'dark-switch']"
    inline-prompt
    :active-icon="Moon"
    :inactive-icon="Sunny"
    @change="toggleDark"
  ></el-switch>
</template>

<style lang="less" scoped>
// 浅色
@light: #f1f1f1;
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
