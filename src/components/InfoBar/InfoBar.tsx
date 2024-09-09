import React from 'react'

import { Icons } from '../ui/Icons'
import './InfoBar.scss'

const InfoBar: React.FC = () => {
  return (
    <div className="info-bar">
      <div className="info-bar__icon">{Icons.info({ className: 'info-bar__icon-svg' })}</div>
      <p className="info-bar__content">Start by uploading the PDF files.</p>
    </div>
  )
}

export default InfoBar
