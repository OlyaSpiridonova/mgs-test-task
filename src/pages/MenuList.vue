<template>
  <q-page class="flex flex-center column">
    <div class="card__title">Меню Блюд</div>
    <div v-if="isLoading">
      <q-spinner-dots
          color="primary"
          size="2em"
        />
    </div>
    <div class="card__wrapeer">
      <q-card v-for="card in cards" :key="card.dish_id" class="my-card" flat bordered style="max-width: 300px">
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6">
              {{ card.dish_name}}
            </div>
          </div>
          <img :src="`data:image/png;base64,${card.dish_image}`" />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <div class="col" >
              {{ card.dish_description}}
            </div>
          <div class="card__price">
           {{card.dish_cost}} ₽
          </div>

        </q-card-actions>
        <div>
          <q-btn @click="changeDescription(card.dish_id)" flat color="primary">
           Изменить описание
          </q-btn>
          <q-btn @click="changePrice(card.dish_id)" flat color="primary">
           Изменить цену
          </q-btn>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default ({
  data () {
    return {
      cards: null,
      key: 'zFIzPW57qS7ORxnKU6ej',
      isLoading: false,
      newDesc: '',
      newPrice: ''
    }
  },
  methods: {
    changeDescription (id) {
      this.newDesc = prompt('Введите описание?', '')
      if (this.newDesc) {
        this.$store.commit('sendSocketMessage', {
          key: this.key,
          id,
          desc_value: this.newDesc,
          operation: 'change_dish_desc'
        })
      }
    },
    changePrice (id) {
      this.newPrice = prompt('Введите новую цену?', '')
      if (this.newPrice) {
        this.$store.commit('sendSocketMessage', {
          key: this.key,
          id,
          cost_value: Number(this.newPrice),
          operation: 'change_dish_cost'
        })
      }
    }
  },
  watch: {
    newMessage () {
      if (this.newMessage.operation === 'dishes_list') {
        this.isLoading = false
        this.cards = this.newMessage.dishes_list
      }
      if (this.newMessage.operation === 'change_dish_desc' || this.newMessage.operation === 'change_dish_cost') {
        this.$store.commit('sendSocketMessage', {
          key: this.key,
          operation: 'dishes_list'
        })
      }
    }
  },
  computed: {
    newMessage () {
      return this.$store.getters.getMessage
    }
  },
  mounted () {
    this.isLoading = true
    setTimeout(() => {
      this.$store.commit('sendSocketMessage', {
        key: this.key,
        operation: 'dishes_list'
      })
    }, 1000)
  }
})
</script>

<style lang="scss">
.card {
  &__title {
    padding-top: 25px;
    font-size: 24px;
    font-weight: 700;
  }

  &__wrapeer {
    padding-top: 50px;
    display: grid;
    gap: 15px;
    grid-template-rows: repeat(3, auto);
    grid-template-columns: repeat(3, 33%);
  }

  &__price {
    font-size: 15px;
    font-weight: 700;
    color: #1976d2;
  }
}

.text-h6 {
  font-size: 15px;
  line-height: 1.2rem;
}

.q-card__section {
  display: flex;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.q-card__actions {
  min-height: 150px;
}

.q-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
img {
  max-width: 70%;
}
</style>
