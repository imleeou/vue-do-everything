<script setup lang="ts">
import Layout from '@/components/Layout/index.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <Layout v-if="!route.meta.hiddenLayout">
    <router-view></router-view>
  </Layout>
  <router-view v-else></router-view>
</template>

<style scoped></style>
