import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default {
  state () {
    return {
      websocket: null,
      message: null
    }
  },
  getters,
  actions,
  mutations
}
