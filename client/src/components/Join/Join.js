import React, { useState, useEffect } from 'react'
import styles from './Join.module.css'
import Label from './Label'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
let socket
// const END_POINT = 'http://localhost:4000'
const END_POINT = 'https://chat-application-training.herokuapp.com/'

const Join = () => {
  const [email, setEmail] = useState('')
  const [room, setRoom] = useState('')
  const clickHandler = (e) => {
    socket = io(END_POINT, { transports: ['websocket'] })
    socket.emit('roomData', { email, room }, () => {
      alert('User has already exited!!!')
      let index = window.location.href.search(window.location.pathname)
      window.location.href = window.location.href.slice(0, index)
    })
    let [headEmailName, tailEmailName] = email.split('@')
    if (!email.includes('@') || !tailEmailName.includes('.')) {
      alert('Please enter a valid email! Something like username@abc.xyz!!!')
      return e.preventDefault()
    }
    if (tailEmailName.split('.')[1] === '') {
      alert('Please enter a valid email! Something like username@abc.xyz!!!')
      return e.preventDefault()
    }
    return null
  }

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const changeRoom = (e) => {
    setRoom(e.target.value)
  }

  return (
    <div className={styles.cart}>
      <div className={styles.container}>
        <h1>Join Room</h1>
        <form>
          <div className={styles.formControl}>
            <input type='text' required onChange={changeEmail} />
            <Label>Email</Label>
          </div>
          <div className={styles.formControl}>
            <input type='text' required onChange={changeRoom} />
            <Label>Room</Label>
          </div>
          <Link onClick={clickHandler} to={`/chat?email=${email}&room=${room}`}>
            <button className={styles.btn} type='submit'>
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Join
