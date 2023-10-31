import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import socketModule from './modules/socket/index'

export default store(function () {
  const Store = createStore({
    modules: {
      socket: socketModule
    },

    strict: process.env.DEBUGGING
  })

  return Store
})
