import { Box, Button } from '@mui/material';

export default function UploadForm ({ onFileChange }) {
return (
<Box>
  <input
    accept=".pdf"
    style={{ display: 'none' }}
    id="contained-button-file"
    multiple
    type="file"
      onChange={onFileChange}

/>
  <label htmlFor="contained-button-file">
    <Button variant="contained" component="span">
      Upload PDF
    </Button>
  </label>
    </Box>
  );
};