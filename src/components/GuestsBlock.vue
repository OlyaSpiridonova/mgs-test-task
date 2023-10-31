<template>
  <q-page class="flex flex-center column">
      <div class="title">Гости</div>
      <BaseLoader v-if="!guests"/>
      <div v-else class="q-pa-md">
          <div class="q-gutter-y-md" style="max-width: 600px">
              <q-card>
                  <q-tabs
                  v-model="tab"
                  dense
                  class="bg-grey-2 text-grey-7"
                  active-color="primary"
                  indicator-color="purple"
                  align="justify"
                  >
                  <q-tab name="registration" label="Регистрация гостя" />
                  <q-tab name="list" label="Список" />
              </q-tabs>
              <q-tab-panels v-model="tab" animated class="bg-white text-white">
                  <q-tab-panel name="registration">
                      <RegistrationGuest />
                  </q-tab-panel>
                  <q-tab-panel name="list">
                      <TableGuests :guests="guests"/>
                  </q-tab-panel>
              </q-tab-panels>
          </q-card>
          </div>
      </div>
  </q-page>
</template>

<script setup>
import BaseLoader from './UI/BaseLoader'
import RegistrationGuest from '../components/RegistrationGuest'
import TableGuests from '../components/TableGuests.vue'
import { ref, computed, watch, inject, onMounted } from 'vue'
import store from '../store/index'

const { socket, sendSocketMessage } = inject('store', store)
const tab = ref('registration')
const guests = ref(null)

const newMessage = computed(() => socket.message)
watch(newMessage, () => {
  if (socket.message.operation === 'guests_list') {
    guests.value = socket.message.guest_list
  }
  if (socket.message.operation === 'guest_regestration') {
    tab.value = 'list'
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
</style>
