import React from 'react'
import Button from '../ui/Button/Button'
import { Icons } from '../ui/Icons/Icons'
import { InvoiceSectionProps } from '../../types'
import './InvoiceSection.scss'
import InvoiceTable from '../InvoiceTable/InvoiceTable'

const InvoiceSection: React.FC<InvoiceSectionProps> = ({ invoiceData, loading, socketData }) => {
  const [selectedTab, setSelectedTab] = React.useState<string>('GRAND TOTAL')

  console.log('Socket Data:', socketData)

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab)
  }

  const grandTotalRows = invoiceData
    ? Object.entries(invoiceData.grand_totals.grand_totals).map(([site, total]) => ({
        site,
        total,
      }))
    : []

  const siteTotalRows =
    invoiceData && selectedTab !== 'GRAND TOTAL' && invoiceData.site_totals[selectedTab]
      ? Object.entries(invoiceData.site_totals[selectedTab].site_totals).map(([site, total]) => ({
          site,
          total,
        }))
      : []

  const renderTable = () => {
    if (invoiceData) {
      if (selectedTab === 'GRAND TOTAL') {
        return (
          <>
            <div className="invoice-section__details">
              <p>Grand Total</p>
            </div>

            <InvoiceTable
              headers={['Site Name', 'Total']}
              rows={grandTotalRows}
              footer={{
                'Overall Grand Total': invoiceData.grand_totals.total_of_grand_totals,
              }}
            />
          </>
        )
      } else if (invoiceData.site_totals[selectedTab]) {
        return (
          <>
            <div className="invoice-section__details">
              <p>Payment Date: {invoiceData.site_totals[selectedTab].invoice.payment_date}</p>
              <p>Transaction ID: {invoiceData.site_totals[selectedTab].invoice.transaction_id}</p>
            </div>
            <InvoiceTable
              headers={['Site Name', 'Total']}
              rows={siteTotalRows}
              footer={{
                Total: invoiceData.site_totals[selectedTab].total,
              }}
            />
          </>
        )
      }
    }
    return null
  }

  return (
    <div className="invoice-section">
      <div className="invoice-section__tabs-wrapper">
        <div className="invoice-section__tabs">
          <Button
            icon={Icons.list({ className: 'invoice-section__icon' })}
            title="Grand Total"
            onClick={() => handleTabClick('GRAND TOTAL')}
          />
          <p>Progress: {socketData?.progress}</p>
          {invoiceData &&
            Object.keys(invoiceData.site_totals).map((invoice, index) => {
              const siteTotal = invoiceData.site_totals[invoice]
              const title = `${siteTotal.invoice.payment_date}`

              return (
                <Button
                  key={index}
                  icon={Icons.list({ className: 'invoice-section__icon' })}
                  title={title}
                  onClick={() => handleTabClick(invoice)}
                />
              )
            })}
        </div>
      </div>
      <div className="invoice-section__separator" />
      {loading && <div className="invoice-section__loading">Loading...</div>}
      <div className="invoice-section__content">{renderTable()}</div>
    </div>
  )
}

export default InvoiceSection
