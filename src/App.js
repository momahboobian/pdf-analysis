import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import UploadForm from "./components/UploadForm";
import ActionButton from "./components/ActionButton";
import CalculationData from "./components/CalculationData";

export default function App() {
  const [file, setFile] = useState(null);
  const [calculationData, setCalculationData] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAction = () => {
    // Implement action logic here
    // For now, let's just display a placeholder result
    setCalculationData(["Result 1", "Result 2", "Result 3"]);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" mt={4}>
        PDF Analysis App
      </Typography>
      <UploadForm onFileChange={handleFileChange} />
      <ActionButton onClick={handleAction} />
      <CalculationData data={calculationData} />
    </Container>
  );
}
