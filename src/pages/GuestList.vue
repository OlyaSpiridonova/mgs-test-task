<template>
  <q-page class="flex flex-center column">
    <div class="card__title">Гости</div>

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
          <q-form
            style="min-width: 500px"
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="surname"
              label="Your surname *"
              hint="Surname"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              filled
              v-model="forename"
              label="Your name *"
              hint="Name"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              filled
              v-model="middlename"
              label="Your middlename *"
              hint="Middlename"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input filled v-model="birthday" mask="date" hint="Birthday" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="birthday">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input
              filled
              v-model="address"
              label="Your address *"
              hint="Address"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              filled
              v-model="phone"
              label="Your number *"
              hint="Number"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              filled
              v-model="email"
              label="Your email *"
              hint="Email"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
      </div>

      <div v-if="secondModel === 'list'" class="guests__list">
        <q-card v-for="guest in guests" :key="guest.id"  class="my-card">
          <q-card-section>
            {{ guest.id }}
          </q-card-section>
          <q-card-section>
            {{ guest.surname }}
          </q-card-section>
          <q-card-section>
            {{ guest.forename }}
          </q-card-section>
          <q-card-section>
            {{ guest.middlename }}
          </q-card-section>
          <q-card-section>
            {{ guest.birthday }}
          </q-card-section>
          <q-card-section>
            {{ guest.address }}
          </q-card-section>
          <q-card-section>
            {{ guest.phones }}
            <q-btn v-if="guest.phones.length < 2" @click="addPhone(guest.id)" flat color="primary">Add phone</q-btn>
          </q-card-section>
          <q-card-section>
            {{ guest.emails }}
            <q-btn v-if="guest.emails.length < 2" @click="addEmail(guest.id)" flat color="primary">Add email</q-btn>
          </q-card-section>
        </q-card>
      </div>
  </q-page>
</template>

<script>
export default ({
  name: 'GuestList',
  data () {
    return {
      websocket: null,
      key: 'zFIzPW57qS7ORxnKU6ej',
      connection_ready: false,
      connection_error: false,
      guests: null,
      model: 'list',
      secondModel: 'registration',
      surname: '',
      forename: '',
      middlename: '',
      birthday: '2019/02/01',
      address: '',
      phone: '',
      email: '',
      secondPhone: '',
      secondEmail: ''
    }
  },
  methods: {
    onSubmit () {
      this.$store.commit('sendSocketMessage', {
        key: this.key,
        operation: 'guest_regestration',
        surname: this.surname,
        forename: this.forename,
        middlename: this.middlename,
        phone: this.phone,
        email: this.email,
        birthday: this.birthday,
        address: this.address
      })
      this.secondModel = 'list'
      this.onReset()
    },

    onReset () {
      this.surname = ''
      this.forename = ''
      this.middlename = ''
      this.birthday = '2019/02/01'
      this.address = ''
      this.phone = ''
      this.email = ''
    },

    addPhone (id) {
      this.secondPhone = prompt('Введите номер телефона?', '')
      if (this.secondPhone) {
        this.$store.commit('sendSocketMessage', {
          key: this.key,
          id,
          phone: this.secondPhone,
          operation: 'add_guestphone'
        })
      }
    },

    addEmail (id) {
      this.secondEmail = prompt('Введите email', '')
      if (this.secondEmail) {
        this.$store.commit('sendSocketMessage', {
          key: this.key,
          id,
          email: this.secondEmail,
          operation: 'add_guestemail'
        })
      }
    }

  },
  watch: {
    newMessage () {
      if (this.newMessage.operation === 'guests_list') {
        this.guests = this.newMessage.guest_list
      }
      if (this.newMessage.operation !== 'guests_list') {
        this.$store.commit('sendSocketMessage', {
          key: this.key,
          operation: 'guests_list'
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
    setTimeout(() => {
      this.$store.commit('sendSocketMessage', {
        key: this.key,
        operation: 'guests_list'
      })
    }, 2000)
  }

})
</script>

<style lang="scss" scoped>
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
}

.guests__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.my-custom-toggle {
  margin: 50px;
  width: 50%;
  border: 1px solid #027be3;
}
.q-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.q-card__section {
  height: 110px;
}
</style>
