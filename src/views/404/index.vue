<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const back = () => {
  router.replace('/')
}
</script>

<template>
  <div class="page-404">404</div>
  <button @click="back">GO HOME</button>
</template>

<style scoped lang="less">
.page-404 {
  color: red;
}
</style>
