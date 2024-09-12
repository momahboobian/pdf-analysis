import React from 'react'
import { useLocation } from 'react-router-dom'

import Header from '../Header/Header'
import InfoBar from '../InfoBar/InfoBar'

import { LandingPageProps } from '../../types'
import './Landing.scss'

const Landing: React.FC<LandingPageProps> = ({ children }) => {
  const location = useLocation()
  return (
    <div className="landing">
      <Header />
      <div className="landing__container">
        <InfoBar />
        {location.pathname === '/' ? (
          <div className="landing__home-content">{children}</div>
        ) : location.pathname === '/admin' ? (
          <div className="landing__admin-content">{children}</div>
        ) : null}
      </div>
    </div>
  )
}

export default Landing
