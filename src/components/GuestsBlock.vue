<template>
    <q-page class="flex flex-center column">
        <div class="title">Гости</div>
        <q-btn-toggle
            v-model="secondModel"
            spread
            class="my-custom-toggle"
            no-caps
            rounded
            unelevated
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
            {label: 'Регистрация гостя', value: 'registration'},
            {label: 'Список гостей', value: 'list'}
            ]"
        />
        <div v-if="secondModel === 'registration'" class="q-pa-md" >
            <registration-guest />
        </div>

        <base-loader v-if="!guests"/>

        <div v-if="secondModel === 'list' && guests" class="guests__list">
            <q-table
                title="Таблица гостей"
                :rows="guests"
                :columns="columns"
                row-key="name"
            />
            <data-changer :phone="true" action="Дополнительный номер телефона для гостя"/>
            <data-changer :email="true" action="Дополнительный email для гостя"/>
        </div>
  </q-page>
</template>

<script setup>
import BaseLoader from './UI/BaseLoader'
import RegistrationGuest from '../components/RegistrationGuest'
import DataChanger from '../components/DataChanger'
import { ref, computed, watch, inject, onMounted } from 'vue'
import store from '../store/index'

const { socket, sendSocketMessage } = inject('store', store)
const secondModel = ref('registration')
const guests = ref(null)

const newMessage = computed(() => socket.message)
watch(newMessage, () => {
  if (socket.message.operation === 'guests_list') {
    guests.value = socket.message.guest_list
  }
  if (socket.message.operation === 'guest_regestration') {
    secondModel.value = 'list'
    sendSocketMessage({
      operation: 'guests_list'
    })
  }
  if (socket.message.operation === 'add_guestphone' || socket.message.operation === 'add_guestemail') {
    sendSocketMessage({
      operation: 'guests_list'
    })
  }
})

onMounted(() => {
  setTimeout(() => {
    sendSocketMessage({
      operation: 'guests_list'
    })
  }, 1000)
})
</script>

<style lang="scss" scoped>
.title {
  padding: 25px;
  font-size: 24px;
  font-weight: 700;
}
.my-custom-toggle {
  margin: 25px;
  border: 1px solid #136ddd;
  width: 30%;
}
</style>
