<template>
    <q-page class="flex flex-center column">
        <div class="title">Меню Блюд</div>
        <BaseLoader v-if="!cards"/>
        <div class="row">
            <DishCard v-for="card in cards" :key="card.id" :card="card"/>
        </div>
    </q-page>
</template>

<script setup>
import DishCard from '../components/UI/DishCard'
import BaseLoader from '../components/UI/BaseLoader'
import store from '../store/index'
import { ref, computed, watch, onMounted, inject } from 'vue'

const cards = ref(null)
const { socket, sendSocketMessage } = inject('store', store)

const newMessage = computed(() => socket.message)
watch(newMessage, () => {
  if (socket.message.operation === 'dishes_list') {
    cards.value = socket.message.dishes_list
  }
  if (socket.message.operation === 'change_dish_desc' || socket.message.operation === 'change_dish_cost') {
    sendSocketMessage({
      operation: 'dishes_list'
    })
  }
})

onMounted(() => {
  setTimeout(() => {
    sendSocketMessage({
      operation: 'dishes_list'
    })
  }, 1000)
})

</script>

<style lang="scss" scoped>
.title {
  padding-top: 25px;
  font-size: 24px;
  font-weight: 700;
}
</style>
