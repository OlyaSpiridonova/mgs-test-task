<template>
    <q-form ref="registrationForm" @submit="submitForm" @reset="onReset" class="q-gutter-md" style="min-width: 500px">
        <template v-for="field in newGuest" :key="field">
            <q-input
                v-if="field.type !== 'date'"
                filled v-model="field.model"
                :label="field.label"
                :hint="field.hint"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-input v-else filled v-model="field.model" mask="date" hint="Birthday" :rules="['date']">
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="field.model">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>
        </template>

        <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
    </q-form>
</template>

<script setup>
import { ref, inject } from 'vue'
import store from '../store/index'
const { sendSocketMessage } = inject('store', store)

const registrationForm = ref(null)
const newGuest = ref({
  surname: { model: '', label: 'Your surname *', hint: 'Surname' },
  forename: { model: '', label: 'Your forename *', hint: 'forename' },
  middlename: { model: '', label: 'Your middlename *', hint: 'middlename' },
  birthday: { model: '', label: 'Your birthday *', hint: 'birthday' },
  address: { model: '', label: 'Your address *', hint: 'address' },
  phone: { model: '', label: 'Your phone *', hint: 'phone' },
  email: { model: '', label: 'Your email *', hint: 'email' }
})

function submitForm () {
  const messageObj = { operation: 'guest_regestration' }
  for (const key in newGuest.value) {
    messageObj[key] = newGuest.value[key].model
  }
  sendSocketMessage(messageObj)
  registrationForm.value.reset()
}
</script>

<style lang="scss" scoped>
</style>
