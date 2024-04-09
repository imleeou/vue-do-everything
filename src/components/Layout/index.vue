<script setup lang="ts">
import TopBar from './modules/TopBar.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <template v-if="route.meta.showLayout">
    <TopBar></TopBar>
    <div class="content" w-full overflow="x-hidden y-auto">
      <slot></slot>
    </div>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>

<style scoped lang="less">
.content {
  height: calc(100vh - @top-bar-height);
}
</style>
