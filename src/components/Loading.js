import { CircularProgress, Typography } from "@mui/material";

export default function Loading() {
  <div className="loading-container">
    <Typography variant="body1" className="loading-prompt">
      Files are in process...
    </Typography>
    <CircularProgress className="loading-spinner" />
  </div>;
}
