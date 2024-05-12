import { useState } from "react";
import { Button } from "@mui/material";

export default function ActionButton({
  uploadCompleted,
  newJob,
  handleAction,
  setNewJob,
}) {
  const [response, setResponse] = useState(null);

  const handleAction = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/action")
      .then((res) => {
        const responseData = res.data[0];
        setResponse(responseData);
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

  return (
    <div>
      {uploadCompleted && !newJob && (
        <Button variant="contained" onClick={handleAction}>
          Display the grand total of the sites
        </Button>
      )}
    </div>
  );
}
