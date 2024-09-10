import React from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../NavBar/NavBar'
import './Header.scss'

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          PDF Analysis
        </Link>
      </div>
      <NavBar />
    </div>
  )
}

export default Header
