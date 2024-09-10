import React from 'react'
import { InvoiceTableProps } from '../../types'
import './InvoiceTable.scss'

const InvoiceTable: React.FC<InvoiceTableProps> = ({ headers, rows, footer }) => {
  return (
    <table className="invoice-table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
      {footer && (
        <tfoot>
          <tr>
            <td colSpan={headers.length - 1} className="invoice-table__footer-label">
              Total:
            </td>
            <td className="invoice-table__footer-value">
              {footer['Overall Grand Total'] || footer['Total']}
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  )
}

export default InvoiceTable
