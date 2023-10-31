export default {
  connectionSocket (state, payload) {
    state.websocket = payload
  },
  setSocketMessage (state, payload) {
    state.message = payload
  },
  sendSocketMessage (state, payload) {
    state.websocket.send(JSON.stringify(payload))
    console.log('Запрос', payload)
  }
}
