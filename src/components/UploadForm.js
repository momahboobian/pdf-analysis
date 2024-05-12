import React, { useState } from "react";
import { Box, Button, Input } from "@mui/material";

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    onUpload(file); // Call the onUpload callback with the selected file
  };

  return (
      <div>
        <Box>
          <Input type="file" onChange={handleFileChange} />
          <Button variant="contained" component="span" onClick={handleSubmit}>
            Upload PDF
          </Button>
        </Box>
      </div>
  );
}