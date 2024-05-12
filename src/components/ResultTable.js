import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

export default function ResultTable({ loading, response, uploadCompleted }) {
  // Handle result table UI
  return (
    <div className="result-table">
      {response && !loading && uploadCompleted && (
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
    </div>
  );
}
