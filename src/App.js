import { useEffect, useState } from "react";
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
  const [invoices, setInvoices] = useState([]);
  const [selectInvoice, setSelectInvoice] = useState("");
  const [loading, setLoading] = useState(false);
  const [folderEmpty, setFolderEmpty] = useState(true);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [newJob, setNewJob] = useState(false);

  // Check if the upload folder is empty on initial load
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/check-folder")
      .then((res) => {
        setFolderEmpty(res.data.folder_empty);
      })
      .catch((err) => {
        console.error("Error checking folder status:", err.message);
        toast.error("An error occurred while checking the folder status.");
      });
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast.error("Please select a file to upload.");
      return;
    }

    setLoading(true);

    // Check if the upload folder is empty
    axios
      .get("http://127.0.0.1:5000/check-folder")
      .then((res) => {
        // Proceed with the upload, including sending the confirmation to the backend
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files[]", file);
        });
        axios
          .post("http://127.0.0.1:5000/upload", formData, {
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

  const handleDeleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleAction = () => {
    setLoading(true);
    axios
      .post("http://127.0.0.1:5000/totals")
      .then((res) => {
        const responseData = res.data[0];

        // setResponse(responseData);
        setResponse(res.data);
        const allInvoices = res.data.map(
          (invoice) => invoice.calculation_results[0].invoice_number
        );
        setInvoices(allInvoices);
        setNewJob(true);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          toast.error(err.response.data.error);
          console.error(
            "An error occurred while performing the action:",
            err.message
          );
        } else {
          toast.error("An error occurred while performing the action.");
        }
      })
      .finally(() => setLoading(false));
  };

  console.log(invoices);

  const handleEmptyFolder = () => {
    axios
      .post("http://127.0.0.1:5000//empty", { confirmation: true })
      .then((res) => {
        toast.success(res.data.message);
        setFolderEmpty(true);
        setUploadCompleted(false);
      })
      .catch((err) => {
        console.error("Error emptying the folder:", err.message);
        toast.error("An error occurred while emptying the folder.");
      });
  };

  const handleInvoiceSelect = (event) => {
    const selectedInvoice = event.target.value;
    setSelectInvoice(selectedInvoice);
  };

  const filteredResponse = selectInvoice
    ? response?.find((item) =>
        item.calculation_results.some(
          (result) => result.invoice_number === selectInvoice
        )
      )
    : response?.[0];

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

      {!folderEmpty ? (
        <Button variant="contained" onClick={handleEmptyFolder}>
          Start by emptying the folder
        </Button>
      ) : (
        <>
          {!uploadCompleted && (
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
          )}

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

          {files.length > 0 ||
            (uploadCompleted && !newJob && (
              <Button variant="contained" onClick={handleAction}>
                Display the grand total of the sites
              </Button>
            ))}

          {response && (
            <div className="invoice-select-container">
              <label htmlFor="invoice-select">Select Invoice:</label>
              <select
                id="invoice-select"
                value={selectInvoice}
                onChange={handleInvoiceSelect}
              >
                <option value="">Grand Total (Default)</option>
                {invoices.map((invoice) => (
                  <option key={invoice} value={invoice}>
                    {invoice}
                  </option>
                ))}
              </select>
            </div>
          )}

          {uploadCompleted && newJob && (
            <Button variant="contained" onClick={handleEmptyFolder}>
              Start a new job
            </Button>
          )}

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

          {filteredResponse && !loading && uploadCompleted && (
            <TableContainer component={Paper} className="table">
              <Table>
                {/* Table header */}
                <TableHead className="tableHead">
                  <TableRow>
                    <TableCell className="tableHeadCell">Site Name</TableCell>
                    <TableCell className="tableHeadCell">Total</TableCell>
                  </TableRow>
                </TableHead>

                {/* Table body */}
                <TableBody>
                  {/* Modify this part to render based on filteredResponse */}
                  {selectInvoice === "" ? (
                    // If no invoice selected, render overall grand total
                    <>
                      {Object.entries(filteredResponse.grand_totals).map(
                        ([site, total]) => (
                          <TableRow key={site} className="tableBodyRow">
                            <TableCell>{site}</TableCell>
                            <TableCell>{total}</TableCell>
                          </TableRow>
                        )
                      )}
                      <TableRow className="tableFooterRow">
                        <TableCell>
                          <strong>Overall Grand Total</strong>
                        </TableCell>
                        <TableCell>
                          <strong>
                            {filteredResponse.overall_grand_total}
                          </strong>
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    // If invoice selected, render site totals for that invoice
                    filteredResponse.calculation_results[0].sites_total_results.map(
                      (item) => (
                        <TableRow key={item.site} className="tableBodyRow">
                          <TableCell>{item.site}</TableCell>
                          <TableCell>{item.total}</TableCell>
                        </TableRow>
                      )
                    )
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
