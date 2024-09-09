import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.scss'

const NavBar: React.FC = () => {
  return (
    <div className="nav-item">
      <Link to="/">Home</Link>
      <Link to="/admin">Admin</Link>
    </div>
  )
}

export default NavBar
