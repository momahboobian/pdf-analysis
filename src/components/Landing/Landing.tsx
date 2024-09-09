import React from 'react'
import Header from '../Header/Header'
import './Landing.scss'

const Landing: React.FC = () => {
  return (
    <div className="landing">
      <Header />
      <div className="landing__container">
        <div className="landing__info-bar">
          <img loading="lazy" src="https:" className="landing__img" alt="Info Icon" />
          <div className="landing__title">
            The app will refresh the data when opened or on changing tabs.
          </div>
        </div>
        {/* Add the rest of the layout here */}
      </div>
    </div>
  )
}

export default Landing
