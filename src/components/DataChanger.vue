<template>
    <div class="q-pa-md q-gutter-sm">
        <q-btn :label="props.action" color="primary" @click="persistent = true" />
        <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
            <q-card class="bg-teal text-white" style="width: 300px">
                <q-card-section>
                <div class="text-h6">{{props.action}}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input v-if="props.phone || props.email" type="number" label="Введите ID гостя" v-model="secondInfo" />
                    <q-input :label="props.action" v-model="changeValue" />
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="Отменить" v-close-popup />
                <q-btn flat label="OK" @click="changeAction(props.action)" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref, defineProps, inject } from 'vue'
import store from '../store/index'
const { sendSocketMessage } = inject('store', store)

const persistent = ref(false)
const changeValue = ref('')
const secondInfo = ref('')

const props = defineProps({
  action: String,
  id: Number,
  phone: Boolean,
  email: Boolean
})

function changeAction (action) {
  if (action === 'Изменить цену') {
    sendSocketMessage({
      id: Number(props.id),
      cost_value: Number(changeValue.value),
      operation: 'change_dish_cost'
    })
  }
  if (action === 'Изменить описание') {
    sendSocketMessage({
      id: Number(props.id),
      desc_value: changeValue.value,
      operation: 'change_dish_desc'
    })
  }
  if (action === 'Дополнительный номер телефона для гостя') {
    sendSocketMessage({
      id: Number(secondInfo.value),
      phone: changeValue.value,
      operation: 'add_guestphone'
    })
  }
  if (action === 'Дополнительный email для гостя') {
    sendSocketMessage({
      id: Number(secondInfo.value),
      email: changeValue.value,
      operation: 'add_guestemail'
    })
  }
  changeValue.value = ''
}
</script>

<style lang="scss" scoped>

</style>
