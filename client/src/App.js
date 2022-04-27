import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Join from './components/Join/Join'
import ChatRoom from './components/ChatRoom/ChatRoom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Join />} />
        <Route path='/chat' element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
