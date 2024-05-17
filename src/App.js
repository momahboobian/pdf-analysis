import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import "./App.css";

const App = () => {
  const [data, setData] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/totals");
        setData(response.data);
        setInvoiceData(response.data.grand_totals.grand_totals);
      } catch (error) {
        toast.error("Failed to fetch data");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleInvoiceChange = (event) => {
    const invoiceKey = event.target.value;
    setSelectedInvoice(invoiceKey);
    if (invoiceKey === "grand_total") {
      setInvoiceData(data.grand_totals.grand_totals);
    } else {
      setInvoiceData(data.site_totals[invoiceKey].site_totals);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Totals Dashboard
      </Typography>
      <Select
        value={selectedInvoice}
        onChange={handleInvoiceChange}
        displayEmpty
        fullWidth
      >
        <MenuItem value="grand_total">Grand Total</MenuItem>
        {data &&
          Object.keys(data.site_totals).map((key) => (
            <MenuItem key={key} value={key}>
              {data.site_totals[key].invoice_number}
            </MenuItem>
          ))}
      </Select>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoiceData &&
            Object.keys(invoiceData).map((location) => (
              <TableRow key={location}>
                <TableCell>{location}</TableCell>
                <TableCell>{invoiceData[location]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default App;
