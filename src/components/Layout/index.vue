<script setup lang="ts">
import TopBar from './modules/TopBar.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <template v-if="route.meta.showLayout">
    <TopBar></TopBar>
    <div class="content">
      <slot></slot>
    </div>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>

<style scoped lang="less">
.content {
  width: 100%;
  height: calc(100vh - @top-bar-height);
}
</style>
