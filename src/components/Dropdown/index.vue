<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { DropdownTabType, NormalTabType } from '@/types/app'

const router = useRouter()
/** 是否展示options */
let showOptions = ref(false)
/** 移出后的计时器 */
let timer: NodeJS.Timeout | null = null
const props = withDefaults(
  defineProps<{
    data: DropdownTabType
    active?: boolean
  }>(),
  {
    active: false
  }
)
const emits = defineEmits(['click'])

/** 鼠标移入事件
 * @param type 0: 鼠标移入 1: 鼠标移出
 */
const mouseEvent = (payload: MouseEvent, type: 0 | 1 = 0) => {
  if (type === 1) {
    timer = setTimeout(() => {
      showOptions.value = false
      clearTimeout(timer as NodeJS.Timeout)
      timer = null
    }, 200)
  } else {
    if (timer) {
      clearTimeout(timer as NodeJS.Timeout)
      timer = null
    }
    showOptions.value = true
  }
}

/** 点击tab */
const handleOption = (tab: NormalTabType) => {
  emits('click')
  router.push({
    path: tab.path
  })
}
</script>

<template>
  <div class="dropdown">
    <div class="body" @mouseover="mouseEvent($event)" @mouseleave="mouseEvent($event, 1)">
      <p :class="[active && 'active-name']">{{ data.name }}</p>
      <el-icon><ArrowDown /></el-icon>
    </div>
    <div class="options" v-if="showOptions" @mouseover="mouseEvent($event)" @mouseleave="mouseEvent($event, 1)">
      <p class="option" v-for="(item, index) in data.children" @click="handleOption(item)" :key="index">
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="less">
.dropdown {
  position: relative;
  .active-name {
    color: var(--text-color-active);
  }

  .body {
    display: flex;
    justify-content: center;
    align-items: center;
    > p {
      font-size: @tab-font-size;
      color: var(--el-text-color-primary);
    }
    > img {
      width: 20px;
    }
  }
  .options {
    width: 100px;
    background-color: rgb(124, 124, 124);
    position: absolute;
    left: 50%;
    top: 150%;
    transform: translateX(-50%);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.12);
    border-radius: 5px;
    overflow: hidden;
    .option {
      padding: 10px 0;
      text-align: center;
      font-size: calc(@tab-font-size - 1px);
      &:hover {
        color: rgb(196, 196, 196);
      }
    }
  }
}
</style>
