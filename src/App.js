import React, { useState } from "react";
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
  CircularProgress, // Import CircularProgress for the loading spinner
} from "@mui/material";

import "./App.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    // Check if the upload folder is empty
    axios
      .get("http://localhost:5000/check-folder")
      .then((res) => {
        // Proceed with the upload, including sending the confirmation to the backend
        const formData = new FormData();
        formData.append("file", file);

        axios
          .post("http://localhost:5000/upload", formData)
          .then((res) => {
            toast.success("File uploaded successfully.");
            setFile(null); // Clear file input after successful upload
          })
          .catch((err) => {
            if (err.response && err.response.data) {
              toast.error(err.response.data.error);
            } else {
              console.error("Error uploading file:", err.message);
              toast.error("An error occurred while uploading the file.");
            }
          });
      })
      .catch((err) => {
        console.error("Error checking folder status:", err.message);
        toast.error("An error occurred while checking the folder status.");
      });
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
        PDF Analysis App
      </Typography>
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload}>
        Upload
      </Button>

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
        mt={2}
      ></Typography>

      {loading && <CircularProgress style={{ margin: "20px auto" }} />}

      {response && (
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
                Object.entries(response.grand_totals).map(([site, total]) => (
                  <TableRow key={site} className="tableBodyRow">
                    <TableCell>{site}</TableCell>
                    <TableCell>{total}</TableCell>
                  </TableRow>
                ))}
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
    </Container>
  );
}
