<script setup lang="ts">
import { TABS, TAB_TYPE } from '@/constants/app'
import Dropdown from '@/components/Dropdown/index.vue'
import { ref } from 'vue'
import { IconTabType, NormalTabType } from '@/types/app'
import { useRouter } from 'vue-router'

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
      <div
        :class="['normal', activeIndex === index && 'active-normal']"
        v-if="tab.type === TAB_TYPE.NORMAL"
        @click="normalClick(tab, index)"
      >
        {{ tab.name }}
      </div>
      <div class="icon" v-if="tab.type === TAB_TYPE.ICON" @click="iconClick(tab, index)">
        <img :src="tab.icon" />
      </div>
      <template v-if="tab.type === TAB_TYPE.DROPDOWN">
        <Dropdown :data="tab" @click="dropdownClick(index)" :active="index === activeIndex"></Dropdown>
      </template>
    </template>
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
    color: @tab-font-color;
  }
  .active-normal {
    color: @tab-font-color-active;
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
