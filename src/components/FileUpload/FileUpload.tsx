import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import Button from '../ui/Button/Button'
import { Icons } from '../ui/Icons/Icons'
import './FileUpload.scss'

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [uploadCompleted, setUploadCompleted] = useState<boolean>(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles(selectedFiles)
  }

  function isError(err: unknown): err is Error {
    return err instanceof Error
  }

  const handleClearFolder = async () => {
    setLoading(true)
    try {
      await axios.post('https://pdf-analysis.moreel.me/api/empty')
      toast.success('Folder cleared successfully.')
      setFiles([])
      setUploadCompleted(false)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Handle Axios-specific errors
        console.error('Error clearing the folder:', err.response?.data?.error || err.message)
        toast.error('An error occurred while clearing the folder.')
      } else if (isError(err)) {
        // Handle general errors
        console.error('Error clearing the folder:', err.message)
        toast.error('An error occurred while clearing the folder.')
      } else {
        console.error('Unexpected error:', err)
        toast.error('An unexpected error occurred.')
      }
    } finally {
      setLoading(false)
    }
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

        await axios.post('https://pdf-analysis.moreel.me/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        toast.success('All files uploaded successfully.')
        setFiles([])
        setUploadCompleted(true)
      } else {
        toast.error('Upload folder is not empty. Please clear the folder and try again.')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        toast.error(`Error: ${error.response?.data?.error || error.message}`)
      } else if (isError(error)) {
        // Handle general errors
        toast.error(`Error: ${error.message}`)
      } else {
        // Handle unexpected errors
        toast.error('An unexpected error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChooseFiles = async () => {
    await handleClearFolder()
    document.getElementById('file-upload')?.click()
  }

  return (
    <div className="file-upload">
      <div className="file-upload__header">
        <h3>Start Here</h3>
      </div>
      <div className="file-upload__actions">
        <input
          type="file"
          id="file-upload"
          className="file-upload__input"
          onChange={handleFileChange}
          multiple
        />
        <Button
          icon={Icons.file({ className: 'file-upload__icon' })}
          title="Choose Files"
          onClick={handleChooseFiles}
        />
        <div className="file-upload__file-list">
          {files.length === 0 ? (
            <div className="file-upload__file-placeholder">You have no files selected.</div>
          ) : (
            <div className="file-upload__file-list-content">
              {files.map((file, index) => (
                <div key={index} className="file-upload__file-item">
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="file-upload__upload-clear">
          <Button
            icon={Icons.upload({ className: 'file-upload__icon' })}
            title={loading ? 'Uploading...' : 'Upload'}
            disabled={loading}
            onClick={handleUpload}
          />
          <Button
            icon={Icons.clear({ className: 'file-upload__icon' })}
            title={loading ? 'Clearing Folder...' : 'Clear Files'}
            color="#CCCCCC"
            disabled={loading}
            onClick={() => setFiles([])}
          />
        </div>
      </div>
      <Button
        icon={Icons.action({ className: 'file-upload__icon' })}
        title="Start Calculation"
        onClick={() => console.log('Start Calculation')}
      />
    </div>
  )
}

export default FileUpload
