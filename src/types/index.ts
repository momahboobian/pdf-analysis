export interface ButtonProps {
  icon?: React.ReactNode
  title: string
  color?: string
  disabled?: boolean
  onClick?: () => void
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

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
}

export interface CheckFolderResponse {
  folder_empty: boolean
}

export interface UploadResponse {
  message: string
}

export interface FileUploadProps {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  setUploadCompleted: React.Dispatch<React.SetStateAction<boolean>>
}

export interface GrandTotals {
  [key: string]: string
}

export interface SiteTotals {
  [key: string]: {
    invoice: {
      payment_date: string
      transaction_id: string
    }
    site_totals: GrandTotals
    total: string
  }
}

export interface CalculationResponse {
  grand_totals: {
    grand_totals: GrandTotals
    total_of_grand_totals: string
  }
  site_totals: SiteTotals
}
