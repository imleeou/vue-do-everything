<script setup lang="ts">
import TopBar from './modules/TopBar.vue'
import BackGround from './modules/BackGround.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <template v-if="route.meta.showLayout">
    <BackGround>
      <TopBar></TopBar>
      <slot></slot>
    </BackGround>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>

<style scoped lang="less"></style>
