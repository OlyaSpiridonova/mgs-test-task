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
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      selectOption: 'menu',
      options: [
        {
          label: 'Меню',
          value: 'menu'
        },
        {
          label: 'Гости',
          value: 'guest'
        }
      ]
    }
  },
  provide () {
    return {
      selectedOption: this.selectOption
    }
  },
  watch: {
    selectOption () {
      const redirectURL = `/${this.$route.query.redirect || this.selectOption}`
      this.$router.replace(redirectURL)
    }
  },
  mounted () {
    const redirectURL = `/${this.$route.query.redirect || this.selectOption}`
    this.$router.replace(redirectURL)
  }
}
</script>
