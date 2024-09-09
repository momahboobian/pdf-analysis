import React from 'react'
import './InvoiceSection.scss'

const InvoiceSection: React.FC = () => {
  return (
    <div className="invoice-section">
      <h2 className="invoice-section__title">Invoice Section</h2>
      {/* Render your table or invoice details here */}
      <div className="invoice-section__content">Table Data Here</div>
    </div>
  )
}

export default InvoiceSection
