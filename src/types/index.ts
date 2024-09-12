export interface ButtonProps {
  key?: string
  icon?: React.ReactNode
  title: string
  color?: string
  disabled?: boolean
  onClick?: () => void
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

export interface Invoice {
  payment_date: string
  transaction_id: string
}

export interface SiteTotals {
  [siteName: string]: number
}

export interface FileData {
  invoice: Invoice
  site_totals: SiteTotals
  total: number
}

export interface GrandTotals {
  [site: string]: string
}

export interface ResponseData {
  grand_totals: GrandTotals
  total_of_grand_totals: string
  site_totals: {
    [file: string]: FileData
  }
}

export interface SocketData {
  file: string
  invoice: Invoice
  site_totals: SiteTotals
  total: number
  progress: number
}

export interface Response {
  grand_totals: {
    grand_totals: GrandTotals
    total_of_grand_totals: string
  }
  site_totals: {
    [file: string]: {
      invoice: Invoice
      site_totals: SiteTotals
      total: number
    }
  }
}

export interface InvoiceData {
  [key: string]: number | string
}

export interface InvoiceSectionProps {
  invoiceData: InvoiceData | null
  loading: boolean
  socketData: SocketData | null
}

// ad;gifj;agjia'dgjd;fgojds;fgk

// export interface InvoiceFile {
//   invoice: Invoice
//   site_totals: SiteTotals
//   total: number
// }

// export interface SiteTotalsData {
//   [fileName: string]: InvoiceFile
// }

// export interface InvoiceData {
//   grand_totals: GrandTotals
//   site_totals: SiteTotalsData
// }

// export interface SiteTotal {
//   invoice: {
//     payment_date: string
//     transaction_id: string
//   }
//   site_totals: InvoiceData
//   total: string
// }

// export interface CalculationResponse {
//   grand_totals: GrandTotals
//   site_totals: {
//     [invoiceKey: string]: SiteTotal
//   }
// }

// ;dgijsdf;gjdsfg;dsfjigdsf;lgjidfs;gofdijgdf
// export interface ApiResponse<T> {
//   success: boolean
//   data: T | undefined
//   message?: string
// }

// export interface CheckFolderResponse {
//   folder_empty: boolean
// }

// export interface UploadResponse {
//   message: string
// }

// export interface InvoiceTableProps {
//   headers: string[]
//   rows: { [key: string]: React.ReactNode }[]
//   footer?: { [key: string]: React.ReactNode }
// }
