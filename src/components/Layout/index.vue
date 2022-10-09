<script setup lang="ts">
import TopBar from './modules/TopBar.vue'
import BackGround from './modules/BackGround.vue'
</script>

<template>
  <BackGround>
    <TopBar></TopBar>
    <slot></slot>
  </BackGround>
</template>

<style scoped lang="less"></style>
