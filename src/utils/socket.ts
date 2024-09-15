import { io } from 'socket.io-client'

const SOCKET_URL = 'http://127.0.0.1:5000/'

const socket = io(SOCKET_URL, {
  path: '/socket.io/',
  transports: ['websocket'],
  secure: true,
})

export default socket
