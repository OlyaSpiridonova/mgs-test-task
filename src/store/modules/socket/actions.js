export default {
  connectSocket (context) {
    const websocket = new WebSocket('ws://178.250.156.182:8080/fortest')
    context.commit('connectionSocket', websocket)
    websocket.onmessage = (event) => {
      const response = JSON.parse(event.data)
      context.commit('setSocketMessage', response)
      console.log('Ответ', response)
    }
  }
}
