<template>
  <div>
      <menu-block v-if="props.selectedOption === 'menu'"/>
      <guests-block v-else />
  </div>
</template>

<script setup>
import MenuBlock from '../components/MenuBlock'
import GuestsBlock from '../components/GuestsBlock'
import { defineProps } from 'vue'
const props = defineProps({
  selectedOption: String
})

</script>
