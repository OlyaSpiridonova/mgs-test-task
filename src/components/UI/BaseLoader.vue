<template>
    <div class="q-pa-md">
        <div class="q-gutter-md row items-center">
        <q-spinner-cube
            v-for="size in ['xl']"
            :key="size"
            :size="size"
            color="primary"
        />
    </div>
  </div>
</template>
