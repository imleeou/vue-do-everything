<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { TABS } from '@/constants/app'
import { IconTypeEnum, TabTypeEnum } from '@/constants/enum'
import Dropdown from '@/components/Dropdown/index.vue'
import ThemeSwitch from './ThemeSwitch.vue'
import { IconTabType, NormalTabType } from '@/types/app'

const router = useRouter()
/** 激活的index */
const activeIndex = ref(0)

/** 下拉菜单点击事件 */
const dropdownClick = (index: number) => {
  activeIndex.value = index
}
/** 图标tab点击 */
const iconClick = (tab: IconTabType, index: number) => {
  activeIndex.value = index
  if (tab.link) {
    location.href = tab.link
  } else if (tab.path) {
    router.push({
      path: tab.path
    })
  }
}
/** 普通tab点击 */
const normalClick = (tab: NormalTabType, index: number) => {
  activeIndex.value = index
  if (tab.path) {
    router.push({
      path: tab.path
    })
  }
}
</script>

<template>
  <div class="menu">
    <template v-for="(tab, index) in TABS" :key="index">
      <!-- 普通文本按钮 -->
      <div
        :class="['normal', activeIndex === index && 'active-normal']"
        v-if="!tab.type || tab.type === TabTypeEnum.NORMAL"
        @click="normalClick(tab, index)"
      >
        {{ tab.name }}
      </div>
      <!-- 图标按钮 -->
      <div class="icon" v-else-if="tab.type === TabTypeEnum.ICON" @click="iconClick(tab, index)">
        <img v-if="tab.iconType === IconTypeEnum.IMG" :src="tab.icon" />
        <div v-else-if="tab.iconType === IconTypeEnum.CLASS" text-3xl :class="tab.icon"></div>
      </div>
      <!-- 下拉菜单 -->
      <template v-else-if="tab.type === TabTypeEnum.DROPDOWN">
        <Dropdown :data="tab" @click="dropdownClick(index)" :active="index === activeIndex"></Dropdown>
      </template>
      <!-- 模式开关 -->
    </template>
    <ThemeSwitch></ThemeSwitch>
  </div>
</template>

<style scoped lang="less">
.menu {
  display: flex;
  align-items: center;
  & > * {
    margin-right: 20px;
    cursor: pointer;
    user-select: none;
  }
  .normal {
    font-size: @tab-font-size;
    color: var(--el-text-color-primary);
  }
  .active-normal {
    color: var(--text-color-active);
  }
  .icon {
    width: 30px;
    height: 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
