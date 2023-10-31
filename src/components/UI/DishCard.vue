<template>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 text-center">{{ props.card.dish_name}}</div>
        <img class="image" :src="`data:image/png;base64,${props.card.dish_image}`"/>
        <div class="text-subtitle2 text-center">{{ card.dish_description}}</div>
        <div class="text-subtitle2 text-center">{{props.card.dish_cost}} ₽</div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="around">
        <data-changer :id="props.card.dish_id" action="Изменить цену"/>
        <data-changer :id="props.card.dish_id" action="Изменить описание"/>
      </q-card-actions>
    </q-card>
</template>

<script setup>
import DataChanger from '../../components/DataChanger'
import { defineProps } from 'vue'
const props = defineProps({
  card: Object
})
</script>

<style lang="scss" scoped>
.image {
    display: block;
    margin: 0 auto;
}
</style>
