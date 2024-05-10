import React, { useState } from "react";
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
} from "@mui/material";
import UploadForm from "./components/UploadForm";
import ActionButton from "./components/ActionButton";
import axios from "axios";
import "./App.css";

export default function App() {
  const [calculationData, setCalculationData] = useState([]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Check if the response contains calculation_results
      if (response.data.calculation_results) {
        setCalculationData(response.data.calculation_results);
      } else {
        console.error("No calculation results found in the response");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:5000/action", {
        file_name: "2DFD1DD0-D76E-48C9-909E-6763605B5D6F.pdf", // Pass the filename or any relevant data
      });
      // Check if the response contains calculation_results
      if (response.data.calculation_results) {
        setCalculationData(response.data.calculation_results);
      } else {
        console.error("No calculation results found in the response");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container className="App">
      <Typography variant="h4" component="h1" align="center" mt={4}>
        PDF Analysis App
      </Typography>
      <UploadForm />
      <ActionButton onClick={handleClick} />
      {calculationData.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Site Name</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calculationData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.site}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{row.gran}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
