import React, { useState } from 'react'
import Button from '../ui/Button/Button'
import { Icons } from '../ui/Icons/Icons'

import './InvoiceSection.scss'

// Dummy data for table
const dummyData = {
  grand_totals: {
    Aldgate: '135.32',
    Birmingham: '290.88',
    Canterbury: '294.96',
    Cardiff: '286.31',
    Chelmsford: '277.67',
    Ealing: '271.10',
    Edinburgh: '335.00',
    Exeter: '302.51',
    Gifting: '149.34',
    Glasgow: '278.80',
    Lakeside: '295.71',
    Leeds: '302.83',
    Liverpool: '245.19',
    Manchester: '275.77',
    Norwich: '227.15',
    OxfordStreet: '254.48',
    Plymouth: '274.82',
    Southend: '250.95',
    Swindon: '182.23',
    TheO2: '288.62',
    Wandsworth: '117.07',
    Watford: '263.29',
  },
  total_of_grand_totals: '5600.00',
}

const InvoiceSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('GRAND TOTAL')

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab)
  }

  return (
    <div className="invoice-section">
      <div className="invoice-section__tabs">
        <Button
          icon={Icons.list({ className: 'invoice-section__icon' })}
          title="GRAND TOTAL"
          onClick={() => handleTabClick('GRAND TOTAL')}
        />
        <Button
          icon={Icons.list({ className: 'invoice-section__icon' })}
          title="INVOICE NAME 1"
          onClick={() => handleTabClick('INVOICE NAME 1')}
        />
        <Button
          icon={Icons.list({ className: 'invoice-section__icon' })}
          title="INVOICE NAME 2"
          onClick={() => handleTabClick('INVOICE NAME 2')}
        />
      </div>
      <div className="invoice-section__separator" />
      <div className="invoice-section__content">
        {selectedTab === 'GRAND TOTAL' && (
          <div className="invoice-section__table">
            <div className="invoice-section__table-header">
              <div className="invoice-section__header-cell">Site Name</div>
              <div className="invoice-section__header-cell">Total</div>
            </div>
            {Object.entries(dummyData.grand_totals).map(([site, total]) => (
              <div key={site} className="invoice-section__table-row">
                <div className="invoice-section__cell">{site}</div>
                <div className="invoice-section__cell">{total}</div>
              </div>
            ))}
            <div className="invoice-section__table-footer">
              <div className="invoice-section__footer-cell">
                <strong>Overall Grand Total</strong>
              </div>
              <div className="invoice-section__footer-cell">
                <strong>{dummyData.total_of_grand_totals}</strong>
              </div>
            </div>
          </div>
        )}
        {/* Placeholder for additional invoice tables */}
        {selectedTab === 'INVOICE NAME 1' && (
          <div className="invoice-section__placeholder">Table for INVOICE NAME 1</div>
        )}
        {selectedTab === 'INVOICE NAME 2' && (
          <div className="invoice-section__placeholder">Table for INVOICE NAME 2</div>
        )}
      </div>
      <div className="invoice-section__separator-2" />
    </div>
  )
}

export default InvoiceSection
