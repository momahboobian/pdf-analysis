export interface ButtonProps {
  icon?: React.ReactNode
  title: string
  color?: string
  disabled?: boolean
  onClick?: () => void
}

export interface InvoiceData {
  [key: string]: number | string
}

export interface SiteTotal {
  invoice: {
    payment_date: string
    transaction_id: string
  }
  site_totals: InvoiceData
  total: string
}

export interface GrandTotals {
  grand_totals: InvoiceData
  total_of_grand_totals: string
}

export interface CalculationResponse {
  grand_totals: GrandTotals
  site_totals: {
    [invoiceKey: string]: SiteTotal
  }
}

export interface InvoiceSectionProps {
  invoiceData: CalculationResponse | null
  loading: boolean
  socketData: SocketData | null
}

export interface ApiResponse<T> {
  success: boolean
  data: T | undefined
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
  setFiles: (files: File[]) => void
  folderName: string
  loading: boolean
  setLoading: (loading: boolean) => void
  uploadCompleted: boolean
  setUploadCompleted: (uploadCompleted: boolean) => void
  onStartCalculation: () => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface InvoiceTableProps {
  headers: string[]
  rows: { [key: string]: React.ReactNode }[]
  footer?: { [key: string]: React.ReactNode }
}

export interface SocketData {
  file: string
  site_totals: SiteTotal
  total: number
  progress: number
  invoice: {
    payment_date: string
    transaction_id: string
  }
}
