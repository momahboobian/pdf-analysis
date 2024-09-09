import React from 'react'
import './Home.scss'
import Landing from '../../components/Landing/Landing'

const Home: React.FC = () => {
  return (
    <div className="home">
      <Landing />

      <h1 className="home__title">Welcome to the Home Page</h1>
    </div>
  )
}

export default Home
