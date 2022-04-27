const express = require('express')
const app = express()
const http = require('http')
const port = process.env.PORT || 5000
const cors = require('cors')

const server = http.createServer(app)
const socketIo = require('socket.io')
const io = socketIo(server)
const router = require('./routes/router')
const User = require('./modules/user')

io.on('connection', (socket) => {
  socket.on('join', ({ email, room }, callback) => {
    const { error, user } = User.addUser({ id: socket.id, email, room })
    if (error) return callback(error)
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}`,
      nameUser: user.name,
    })
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined!` })

    socket.join(user.room)

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = User.getUser(socket.id)
    // important
    io.to(user.room).emit('message', { user: user.name, text: message })

    callback()
  })

  socket.on('roomData', ({ email, room }, callback) => {
    const users = User.getUsersInRoom(room)
    const [name] = email.split('@')
    const index = users.findIndex((user) => user.name === name)
    if (index !== -1) callback()
  })

  socket.on('disconnect', () => {
    const user = User.removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left!`,
      })
    }
  })
})

app.use(router)
app.use(cors())

server.listen(port, () => console.log('Server has started on port ', port))
