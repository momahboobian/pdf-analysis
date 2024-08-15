import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '@mui/material'

const FileUpload = ({ files, setFiles, setUploadCompleted }) => {
  const [loading, setLoading] = useState(false)

  const handleFileChange = e => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(selectedFiles)
  }

  const handleClearFolder = () => {
    setLoading(true)
    axios
      .post('https://pdf-analysis.moreel.me/api/empty')
      .then(res => {
        toast.success('Folder cleared successfully.')
        setFiles([])
        setUploadCompleted(false) // Reset upload completed state
      })
      .catch(err => {
        console.error('Error clearing the folder:', err.message)
        toast.error('An error occurred while clearing the folder.')
      })
      .finally(() => setLoading(false))
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select a file to upload.')
      return
    }

    setLoading(true)

    try {
      const { data } = await axios.get('https://pdf-analysis.moreel.me/api/check-folder')
      if (data.folder_empty) {
        const formData = new FormData()
        files.forEach(file => formData.append('files[]', file))

        axios.post('https://pdf-analysis.moreel.me/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        toast.success('All files uploaded successfully.')
        setFiles([])
        setUploadCompleted(true)
      } else {
        toast.error('Upload folder is not empty. Please clear the folder and try again.')
      }
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.error || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="file-upload-container">
      <input
        type="file"
        id="file-upload"
        className="file-upload-input"
        onChange={handleFileChange}
        multiple
      />
      <Button variant="contained" onClick={handleClearFolder} disabled={loading}>
        {loading ? 'Clearing Folder...' : 'Clear Folder'}
      </Button>

      <label htmlFor="file-upload">
        <Button variant="contained" component="span">
          Choose Files
        </Button>
      </label>

      <Button variant="contained" onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  )
}

export default FileUpload
