import React from 'react'
import { ButtonProps } from '../../../types'

import './Button.scss'

const Button: React.FC<ButtonProps> = ({ icon, title, color, disabled, onClick }) => {
  return (
    <button
      className={`custom-btn ${disabled ? 'custom-btn__disabled' : ''}`}
      style={{
        background: disabled ? '#CCCCCC' : color,
      }}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      <div className="custom-btn__icon">{icon}</div>
      <div className="custom-btn__title">{title}</div>
    </button>
  )
}

export default Button
