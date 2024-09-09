import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Home from './pages/Home/Home'
import Admin from './pages/Admin/Admin'
import './App.scss'

function App() {
  return (
    <Router>
      <div className="app">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
