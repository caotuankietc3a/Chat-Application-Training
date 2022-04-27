import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import ChatForm from '../ChatForm/ChatForm'
import { Link } from 'react-router-dom'

let socket
const END_POINT = 'https://chat-application-training.herokuapp.com/'
// const END_POINT = 'http://localhost:4000'

const ChatRoom = () => {
  const [email, setEmail] = useState('')
  const [room, setRoom] = useState('')
  const [error, setError] = useState('')

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  let charFormVar

  useEffect(() => {
    const { email, room } = queryString.parse(window.location.search)
    socket = io(END_POINT, { transports: ['websocket'] })
    setEmail(email)
    setRoom(room)

    socket.emit('join', { email, room }, (error) => {
      if (error) {
        setError(error)
      }
    })

    return function cleanup() {
      socket.emit('disconnect')
      socket.off()
    }
  }, [END_POINT, window.location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((preMesses) => [...preMesses, message])
    })
  }, [])

  const sendMessageHandler = (e) => {
    const keycode = e.which || e.keyCode
    if (keycode === 13 && !e.shiftKey) {
      if (message) {
        socket.emit('sendMessage', message, () => {
          setMessage('')
        })
      }
      e.preventDefault()
    }
  }

  const clickButtonHandler = () => {
    if (message) {
      socket.emit('sendMessage', message, () => {
        setMessage('')
      })
    }
  }

  const msgChangeHandler = (e) => {
    setMessage(e.target.value)
  }

  error
    ? (charFormVar = <Link to='/'></Link>)
    : (charFormVar = (
        <ChatForm
          clickButtonHandler={clickButtonHandler}
          msgChangeHandler={msgChangeHandler}
          msgSendHandler={sendMessageHandler}
          mes={message}
          room={room}
          messages={messages}
          nameUser={messages[0] ? messages[0].nameUser : null}
        />
      ))

  return charFormVar
}

export default ChatRoom
