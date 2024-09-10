import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { getRequest } from '../../services/api'
import { CheckFolderResponse, CalculationResponse } from '../../types'

import InvoiceSection from '../../components/InvoiceSection/InvoiceSection'
import FileUpload from '../../components/FileUpload/FileUpload'
import './Home.scss'

const Home: React.FC = () => {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [uploadCompleted, setUploadCompleted] = useState<boolean>(false)
  const [invoiceData, setInvoiceData] = useState<CalculationResponse | null>(null)

  const handleStartCalculation = async () => {
    if (!uploadCompleted) {
      toast.error('Please complete the file upload before starting the calculation.')
      return
    }

    setLoading(true)
    toast.info('Calculation started, please wait ...')
    const folderStatus = await getRequest<CheckFolderResponse>('/check-folder')
    if (folderStatus.success) {
      const response = await getRequest<CalculationResponse>('/totals')
      if (response.success && response.data) {
        setInvoiceData(response.data)
        toast.success('Calculation completed successfully.')
      } else {
        setInvoiceData(null)
        toast.error(response.message || 'Failed to start calculation.')
      }
    } else {
      toast.error('Upload folder is empty. Please upload files and try again.')
    }
    setLoading(false)
  }

  return (
    <div className="home">
      <div className="home__file-upload">
        <FileUpload
          files={files}
          setFiles={setFiles}
          loading={loading}
          setLoading={setLoading}
          uploadCompleted={uploadCompleted}
          setUploadCompleted={setUploadCompleted}
          onStartCalculation={handleStartCalculation}
        />
      </div>
      <div className="home__invoice-section">
        <InvoiceSection invoiceData={invoiceData} loading={loading} />
      </div>
    </div>
  )
}

export default Home
