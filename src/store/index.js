import { reactive } from 'vue'

const url = '178.250.156.182:8080/fortest'

const socket = reactive({
  key: 'zFIzPW57qS7ORxnKU6ej',
  websocket: null,
  message: null
})

function connectSocket () {
  const ws = new WebSocket(`ws://${url}`)
  socket.websocket = ws
  ws.onmessage = (event) => {
    const response = JSON.parse(event.data)
    socket.message = response
  }
}

function sendSocketMessage (responseObj) {
  socket.websocket.send(JSON.stringify({
    key: socket.key,
    ...responseObj
  }))
}

export default {
  socket,
  connectSocket,
  sendSocketMessage
}
