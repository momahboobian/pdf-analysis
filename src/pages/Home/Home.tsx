import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import socket from '../../utils/socket'

import { getRequest } from '../../services/api'
import { InvoiceData, SocketData } from '../../types'

import InvoiceSection from '../../components/InvoiceSection/InvoiceSection'
import FileUpload from '../../components/FileUpload/FileUpload'
import './Home.scss'

const Home: React.FC = () => {
  const [files, setFiles] = useState<File[]>([])
  const [folderName, setFolderName] = React.useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [uploadCompleted, setUploadCompleted] = useState<boolean>(false)
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)
  const [socketData, setSocketData] = useState<SocketData | null>(null)

  console.log('files:', files)
  console.log('loading:', loading)
  console.log('folderName:', folderName)
  console.log('uploadCompleted:', uploadCompleted)
  console.log('invoiceData:', invoiceData)
  console.log('socketData:', socketData)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
    })

    socket.on('invoice_processed', (data: SocketData) => {
      setSocketData(data)
    })

    return () => {
      socket.off('invoice_processed')
      socket.off('connect')
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles(selectedFiles)
    setFolderName(new Date().toISOString())
  }

  const handleStartCalculation = async () => {
    if (!uploadCompleted) {
      toast.error('Please complete the file upload before starting the calculation.')
      return
    }

    setLoading(true)
    toast.info('Calculation started, please wait ...')

    const folderStatus = await getRequest(`/totals?folder_name=${encodeURIComponent(folderName)}`)
    if (folderStatus.success) {
      const response = await getRequest(`/totals?folder_name=${encodeURIComponent(folderName)}`)
      if (response.success && response.data) {
        setInvoiceData(response.data as InvoiceData)
        toast.success('Calculation completed successfully.')
      } else {
        setInvoiceData(null)
        toast.warning(response.message || 'Calculation failed.')
      }
    } else {
      toast.error(
        'An error occurred while starting the calculation. Please upload files and try again.'
      )
    }
    setLoading(false)
  }

  return (
    <div className="home">
      <div className="home__file-upload">
        <FileUpload
          files={files}
          setFiles={setFiles}
          folderName={folderName}
          loading={loading}
          setLoading={setLoading}
          uploadCompleted={uploadCompleted}
          setUploadCompleted={setUploadCompleted}
          onStartCalculation={handleStartCalculation}
          onFileChange={handleFileChange}
        />
      </div>
      <div className="home__invoice-section">
        <InvoiceSection invoiceData={invoiceData} loading={loading} socketData={socketData} />
      </div>
    </div>
  )
}

export default Home
