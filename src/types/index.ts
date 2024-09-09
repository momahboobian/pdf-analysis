export interface ButtonProps {
  icon?: React.ReactNode
  title: string
  color?: string
  disabled?: boolean
}

export interface InvoiceData {
  [key: string]: number
}

export interface siteTotals {
  [key: string]: {
    site_totals: InvoiceData
    total: number
    invoice: {
      payment_date: string
      transaction_id: string
    }
  }
}

export interface ApiResponse {
  grand_totals: {
    grand_totals: InvoiceData
    total_of_grand_totals: number
  }
  site_totals: siteTotals
}

export interface FileUploadProps {
  file: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  setUploadCompleted: React.Dispatch<React.SetStateAction<boolean>>
}
