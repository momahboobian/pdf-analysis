import { useState } from 'react'
import { Typography, Button } from '@mui/material'

export default function SelectedFiles() {
  const [files, setFiles] = useState([])

  const handleDeleteFile = index => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
  }

  return (
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
  )
}
