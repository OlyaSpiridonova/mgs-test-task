<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <div class="q-pa-md" style="max-width: 300px">
        <div class="q-gutter-md">
          <q-select
            filled
            v-model="selectOption"
            :options="options"
            label=""
            emit-value
            map-options
          />
        </div>
      </div>
    </q-header>

    <q-page-container >
      <MainPage :selectedOption="selectOption"/>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import MainPage from '../pages/MainPage'
import { ref } from 'vue'

const selectOption = ref('menu')
const options = [
  {
    label: 'Меню',
    value: 'menu'
  },
  {
    label: 'Гости',
    value: 'guest'
  }
]
</script>
