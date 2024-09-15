import { io } from 'socket.io-client'

const SOCKET_URL = 'https://pdf-analysis.moreel.me/'

const socket = io(SOCKET_URL, {
  path: '/socket.io/',
  transports: ['websocket'],
  secure: true,
})

export default socket
