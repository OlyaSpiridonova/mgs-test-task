<template>
    <div class="q-pa-md">
      <q-table
        flat bordered
        title="Гости"
        :rows="props.guests"
        :columns="columns"
        row-key="id"
      >

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <DataChanger v-if="props.row.phones.length < 2" :id="props.row.id" action = 'Дополнительный номер телефона для гостя'/>
              <DataChanger v-if="props.row.emails.length < 2" :id="props.row.id" action = 'Дополнительный email для гостя'/>
              <div v-else class="text-left">Для гостя {{ props.row.surname }} указаны все дополнительные данные.</div>
            </q-td>
          </q-tr>
        </template>

      </q-table>
    </div>
  </template>

<script setup>
import DataChanger from '../components/DataChanger.vue'
import { defineProps } from 'vue'

const props = defineProps({
  guests: Array
})

</script>
