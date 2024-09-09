import React, { useState } from 'react'
import { toast } from 'react-toastify'

import Button from '../ui/Button/Button'
import { Icons } from '../ui/Icons/Icons'
import {
  FileUploadProps,
  CheckFolderResponse,
  UploadResponse,
  CalculationResponse,
} from '../../types'
import { getRequest, postRequest } from '../../services/api'
import './FileUpload.scss'

const FileUpload: React.FC<FileUploadProps> = () => {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [uploadCompleted, setUploadCompleted] = useState<boolean>(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles(selectedFiles)
  }

  const handleClearFolder = async () => {
    const response = await postRequest<UploadResponse>('/empty', {})
    if (response.success) {
      toast.success('Folder cleared successfully.')
      setFiles([])
      setUploadCompleted(false)
    } else {
      toast.error(response.message || 'Failed to clear folder.')
    }
    setLoading(false)
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select a file to upload.')
      return
    }

    setLoading(true)
    const folderStatus = await getRequest<CheckFolderResponse>('/check-folder')
    if (folderStatus.success && folderStatus.data?.folder_empty) {
      const formData = new FormData()
      files.forEach(file => formData.append('files[]', file))

      const uploadResponse = await postRequest<UploadResponse>('/upload', formData)
      if (uploadResponse.success) {
        toast.success('All files uploaded successfully.')
        setFiles([])
        setUploadCompleted(true)
      } else {
        toast.error(uploadResponse.message || 'File upload failed.')
      }
    } else {
      toast.error('Upload folder is not empty. Please clear the folder and try again.')
    }
    setLoading(false)
  }

  const handleChooseFiles = async () => {
    await handleClearFolder()
    setTimeout(() => {
      document.getElementById('file-upload')?.click()
    }, 500)
  }

  const handleStartCalculation = async () => {
    if (!uploadCompleted) {
      toast.error('Please complete the file upload before starting the calculation.')
      return
    }

    setLoading(true)
    const folderStatus = await getRequest<CheckFolderResponse>('/check-folder')
    if (folderStatus.success) {
      const response = await getRequest<CalculationResponse>('/totals')
      if (response.success) {
        toast.success('Calculation started successfully.')
      } else {
        toast.error(response.message || 'Failed to start calculation.')
      }
    } else {
      toast.error('Upload folder is empty. Please upload files and try again.')
    }
    setLoading(false)
  }

  return (
    <div className="file-upload">
      <div className="file-upload__header">Start Here</div>
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
          {loading && (
            <div className="file-upload__spinner">
              {Icons.spinner({ className: 'file-upload__icon-spinner' })}
            </div>
          )}

          {uploadCompleted && files.length === 0 ? (
            <div className="file-upload__file-placeholder">
              All files have been uploaded successfully. Start the calculation by clicking on the
              START CALCULATION button.
            </div>
          ) : files.length === 0 ? (
            <div className="file-upload__file-placeholder">You have no files selected...</div>
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
            title="Upload"
            onClick={handleUpload}
          />
          <Button
            icon={Icons.clear({ className: 'file-upload__icon' })}
            title="Clear Files"
            onClick={() => setFiles([])}
            disabled={files.length === 0}
          />
        </div>
      </div>
      <Button
        icon={Icons.action({ className: 'file-upload__icon' })}
        title="Start Calculation"
        onClick={handleStartCalculation}
        disabled={loading || (!uploadCompleted && files.length === 0)}
      />
    </div>
  )
}

export default FileUpload
