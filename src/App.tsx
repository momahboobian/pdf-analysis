import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Landing from './components/Landing/Landing'

import Home from './pages/Home/Home'
import Admin from './pages/Admin/Admin'
import './App.scss'

function App() {
  return (
    <Router>
      <div className="app">
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <Landing>
                <Home />
              </Landing>
            }
          />
          <Route
            path="/admin"
            element={
              <Landing>
                <Admin />
              </Landing>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
