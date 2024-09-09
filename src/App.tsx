import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Select,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material'

import './App.css'
import FileUpload from './components/FileUpload'

export default function App() {
  const [files, setFiles] = useState([])
  const [data, setData] = useState(null)
  const [selectedInvoice, setSelectedInvoice] = useState('grand_total')
  const [invoiceData, setInvoiceData] = useState(null)
  const [invoiceTotal, setInvoiceTotal] = useState(null)
  // const [folderEmpty, setFolderEmpty] = useState(true);
  const [uploadCompleted, setUploadCompleted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAction = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://pdf-analysis.moreel.me/api/totals')
      setData(response.data)
      setInvoiceData(response.data.grand_totals.grand_totals)
      setInvoiceTotal(response.data.grand_totals.total_of_grand_totals)
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message
      toast.error(`Error: ${errorMessage}`)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleInvoiceChange = event => {
    const invoiceKey = event.target.value
    setSelectedInvoice(invoiceKey)
    if (invoiceKey === 'grand_total') {
      setInvoiceData(data.grand_totals.grand_totals)
      setInvoiceTotal(data.grand_totals.total_of_grand_totals)
    } else {
      setInvoiceData(data.site_totals[invoiceKey].site_totals)
      setInvoiceTotal(data.site_totals[invoiceKey].total)
    }
  }

  const handleDeleteFile = index => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
  }

  return (
    <Container>
      <ToastContainer />
      <Typography variant="h4" gutterBottom component="h1" align="center" mt={4}>
        PDF Invoice Analysis App
      </Typography>

      <div className="file-upload-container">
        <FileUpload files={files} setFiles={setFiles} setUploadCompleted={setUploadCompleted} />
      </div>

      {files.length > 0 && (
        <div className="selected-files-container" data-count={`${files.length} files selected`}>
          {files.map((file, index) => (
            <div key={index} className="selected-file">
              <Typography variant="body1" className="file-name">
                {file.name}
              </Typography>
              <Button variant="outlined" color="secondary" onClick={() => handleDeleteFile(index)}>
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
      <Button variant="contained" color="primary" onClick={handleAction} disabled={loading}>
        {loading ? 'Processing...' : 'Start the calculation for the sites'}
      </Button>
      {loading && (
        <div className="loading-container">
          <Typography variant="body1" className="loading-prompt">
            Files are in process...
          </Typography>
          <CircularProgress className="loading-spinner" />
        </div>
      )}
      <>
        <TableContainer component={Paper} className="table">
          <Select
            value={selectedInvoice}
            onChange={handleInvoiceChange}
            displayEmpty
            fullWidth
            style={{ marginBottom: 20 }}
          >
            <MenuItem value="grand_total">Grand Total</MenuItem>
            {data &&
              Object.keys(data.site_totals).map(key => (
                <MenuItem key={key} value={key}>
                  {`Invoice: Payment Date: ${data.site_totals[key].invoice.payment_date}, Transaction ID: ${data.site_totals[key].invoice.transaction_id}` ||
                    'Unnamed Invoice'}
                </MenuItem>
              ))}
          </Select>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Total (£)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceData &&
                Object.keys(invoiceData).map(location => (
                  <TableRow key={location}>
                    <TableCell>{location}</TableCell>
                    <TableCell>£{invoiceData[location]}</TableCell>
                  </TableRow>
                ))}
              {invoiceTotal && (
                <TableRow>
                  <TableCell>
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell>
                    <strong>£{invoiceTotal}</strong>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </Container>
  )
}
