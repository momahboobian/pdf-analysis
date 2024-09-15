import React from 'react'
import Button from '../ui/Button/Button'
import { Icons } from '../ui/Icons/Icons'
import { InvoiceSectionProps } from '../../types'
import './InvoiceSection.scss'
import InvoiceTable from '../InvoiceTable/InvoiceTable'

const InvoiceSection: React.FC<InvoiceSectionProps> = ({ invoiceData, loading, socketData }) => {
  const [selectedTab, setSelectedTab] = React.useState<string>('GRAND TOTAL')

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab)
  }

  // Defensive check for grand totals
  const grandTotalRows = invoiceData?.grand_totals?.grand_totals
    ? Object.entries(invoiceData.grand_totals.grand_totals).map(([site, total]) => ({
        site,
        total: String(total),
      }))
    : []

  // Defensive check for site totals
  const siteTotalRows = invoiceData?.site_totals?.[selectedTab]?.sites_totals
    ? Object.entries(invoiceData.site_totals[selectedTab].sites_totals).map(([site, total]) => ({
        site,
        total: String(total),
      }))
    : []

  const renderTable = () => {
    if (!invoiceData) return null

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
    } else if (invoiceData.site_totals?.[selectedTab]) {
      return (
        <>
          <div className="invoice-section__details">
            <p>
              Payment Date: {invoiceData.site_totals[selectedTab]?.invoice?.payment_date ?? 'N/A'}
            </p>
            <p>
              Transaction ID:{' '}
              {invoiceData.site_totals[selectedTab]?.invoice?.transaction_id ?? 'N/A'}
            </p>
          </div>
          <InvoiceTable
            headers={['Site Name', 'Total']}
            rows={siteTotalRows}
            footer={{
              Total: invoiceData.site_totals[selectedTab]?.total ?? 'N/A',
            }}
          />
        </>
      )
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
      <div className="invoice-section__separator"></div>
      {loading ? (
        <div className="invoice-section__progress">
          <div
            className="invoice-section__progress-bar"
            style={{ width: `${socketData?.progress ?? 0}%` }}
          />
          <p>Progress: {socketData?.progress}%</p>
        </div>
      ) : (
        <div className="invoice-section__content">{renderTable()}</div>
      )}
    </div>
  )
}

export default InvoiceSection
