import React from 'react'

import InvoiceSection from '../../components/InvoiceSection/InvoiceSection'
import FileUpload from '../../components/FileUpload/FileUpload'
import './Home.scss'

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="home__file-upload">
        <FileUpload />
      </div>
      <div className="home__invoice-section">
        <InvoiceSection />
      </div>
    </div>
  )
}

export default Home
