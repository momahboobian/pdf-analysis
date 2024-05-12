import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";

import "./App.css";

export default function App() {
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [folderEmpty, setFolderEmpty] = useState(true);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast.error("Please select a file to upload.");
      return;
    }

    setLoading(true);

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
            setFiles([]); // Clear file input after successful upload
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

  const handleDeleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleAction = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/action")
      .then((res) => {
        const responseData = res.data[0];
        setResponse(responseData);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast.error(err.response.data.error);
          console.error(
            "An error occurred while performing the action:",
            err.message
          );
        } else {
          toast.error(
            "An error occurred while performing the action." + err.message
          );
        }
      })
      .finally(() => setLoading(false));
  };

  const handleEmptyFolder = () => {
    axios
      .post("http://localhost:5000/empty", { confirmation: true })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast.error(err.response.data.error);
        } else {
          toast.error(
            "An error occurred while emptying the folder." + err.message
          );
        }
      });
  };

  return (
    <Container className="App">
      <ToastContainer />
      <Typography
        variant="h4"
        gutterBottom
        component="h1"
        align="center"
        mt={4}
      >
        PDF Invoice Analysis App
      </Typography>

      {folderEmpty ? (
        <Button variant="contained" onClick={handleEmptyFolder}>
          Start by emptying the folder
        </Button>
      ) : (
        <>
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

          {files.length > 0 && (
            <div
              className="selected-files-container"
              data-count={`${files.length} files selected`}
            >
              {files.map((file, index) => (
                <div key={index} className="selected-file">
                  <Typography variant="body1" className="file-name">
                    {file.name}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteFile(index)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Button variant="contained" onClick={handleAction}>
            Action
          </Button>

          <Button variant="contained" onClick={handleEmptyFolder}>
            Empty Folder
          </Button>

          <Typography
            variant="body1"
            color="error"
            align="center"
            mt={4}
          ></Typography>

          {loading && (
            <div className="loading-container">
              <Typography variant="body1" className="loading-prompt">
                Files are in process...
              </Typography>
              <CircularProgress className="loading-spinner" />
            </div>
          )}
          {response && !loading && (
            <TableContainer component={Paper} className="table">
              <Table>
                <TableHead className="tableHead">
                  <TableRow>
                    <TableCell className="tableHeadCell">Site Name</TableCell>
                    <TableCell className="tableHeadCell">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {response &&
                    Object.entries(response.grand_totals).map(
                      ([site, total]) => (
                        <TableRow key={site} className="tableBodyRow">
                          <TableCell>{site}</TableCell>
                          <TableCell>{total}</TableCell>
                        </TableRow>
                      )
                    )}
                  {response && response.overall_grand_total && (
                    <TableRow className="tableFooterRow">
                      <TableCell>
                        <strong>Overall Grand Total</strong>
                      </TableCell>
                      <TableCell>
                        <strong>{response.overall_grand_total}</strong>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </Container>
  );
}
