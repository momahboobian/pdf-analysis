import { Box, Typography } from '@mui/material';


export default function CalculationData ({ data })  {
return (
<Box mt={2}>
    <Typography variant="h6" gutterBottom>
    Calculation Results
    </Typography>
    <ul>
    {data.map((item, index) => (
        <li key={index}>{item}</li>
    ))}
</ul>
</Box>
);
};