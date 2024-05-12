import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";

export default function FileUpload({ setUploadCompleted }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    if (files.length === 0) {
      toast.error("Please select a file to upload.");
      return;
    }

    setLoading(true);

    // Proceed with the upload
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    // Check if the upload folder is empty
    axios
      .get("http://localhost:5000/check-folder")
      .then((res) => {
        // Proceed with the upload, including sending the confirmation to the backend
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files[]", file);
        });
        axios
          .post("http://localhost:5000/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            toast.success("All files uploaded successfully.");
            setFiles([]);
            setUploadCompleted(true);
          })
          .catch((err) => {
            if (err.response && err.response.data) {
              toast.error(err.response.data.error);
            } else {
              console.error("Error uploading file:", err.message);
              toast.error("An error occurred while uploading the file.");
            }
          })
          .finally(() => setLoading(false));
      })
      .catch((err) => {
        console.error("Error checking folder status:", err.message);
        toast.error("An error occurred while checking the folder status.");
      });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  return (
    <div className="file-upload-container">
      <input
        type="file"
        id="file-upload"
        className="file-upload-input"
        onChange={handleFileChange}
        multiple
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span">
          Choose Files
        </Button>
      </label>
      <Button variant="contained" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}
