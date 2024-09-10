import React from 'react'
import { InvoiceTableProps } from '../../types'
import './InvoiceTable.scss'

const InvoiceTable: React.FC<InvoiceTableProps> = ({ headers, rows, footer }) => {
  return (
    <div className="table">
      <div className="table__header">
        {headers.map((header, index) => (
          <div key={index} className="table__header-cell">
            {header}
          </div>
        ))}
      </div>
      <div className="table__body">
        {rows.map((row, index) => (
          <div key={index} className="table__row">
            {Object.values(row).map((cell, cellIndex) => (
              <div key={cellIndex} className="table__cell">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      {footer && (
        <div className="table__footer">
          {Object.entries(footer).map(([key, value]) => (
            <div key={key} className="table__footer-cell">
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InvoiceTable
