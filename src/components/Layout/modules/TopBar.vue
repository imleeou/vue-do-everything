<script setup lang="ts">
import Menu from './Menu.vue'
</script>

<template>
  <div class="top-bar">
    <div class="name-item">
      <p class="self-name">Leeou</p>
      <p class="item-name">Whatever is worth doing is worth doing well.</p>
    </div>
    <div class="links">
      <Menu></Menu>
    </div>
  </div>
</template>

<style scoped lang="less">
.top-bar {
  width: 100%;
  height: @top-bar-height;
  background-color: var(--top-bar-bg);
  color: var(--el-text-color-primary);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--primary-box-shadow);
  .name-item {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    padding: 10px 0;
    .self-name {
      font-size: 32px;
      font-weight: bolder;
    }
    .item-name {
      font-size: 14px;
      margin-left: 10px;
    }
  }
}
</style>
