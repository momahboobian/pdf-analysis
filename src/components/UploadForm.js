import React, { useState } from "react";
import { Box, Button, Input } from "@mui/material";

import axios from "axios";

export default function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
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
