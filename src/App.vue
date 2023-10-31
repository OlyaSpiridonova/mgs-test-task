<template>
  <router-view />
</template>

<script setup>
import store from './store/index'
import { provide, onMounted } from 'vue'

provide('store', store)

onMounted(() => {
  store.connectSocket()
})
</script>
