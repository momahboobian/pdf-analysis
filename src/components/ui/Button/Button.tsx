import React from 'react'
import { ButtonProps } from '../../../types'

import './Button.scss'

const Button: React.FC<ButtonProps> = ({ icon, title, color, disabled }) => {
  return (
    <button
      className={`custom-btn ${disabled ? 'custom-btn__disabled' : ''}`}
      style={{
        background: disabled ? '#CCCCCC' : color,
      }}
      disabled={disabled}
    >
      <div className="custom-btn__icon">{icon}</div>
      <div className="custom-btn__title">{title}</div>
    </button>
  )
}

export default Button
