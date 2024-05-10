import { Box, Button } from '@mui/material';

export default function  ActionButton  ({ onClick }) {
return (
    <Box mt={2}>
        <Button variant="contained" onClick={onClick}>
        Perform Action
        </Button>
    </Box>
    );
};
