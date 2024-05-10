import React, { useState } from 'react';
import { Button, Container, Divider, Input, TextArea } from '@lucid-ui/core';
import { Card, CardBody, CardHeader } from '@lucid-ui/card';

export default function App()  {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Make API call to send file to backend for processing
    // Update 'data' state with calculation results
  };

  return (
    <Container maxWidth="lg" paddingY={6}>
      <Card>
        <CardHeader>
          <h2>PDF Processing App</h2>
        </CardHeader>
        <CardBody>
          <Input type="file" onChange={handleFileChange} />
          <Divider marginY={4} />
          <Button onClick={handleSubmit}>Process PDF</Button>
        </CardBody>
      </Card>

      {data && (
        <Card marginTop={4}>
          <CardHeader>
            <h3>Calculation Results</h3>
          </CardHeader>
          <CardBody>
            <TextArea readOnly value={data} rows={8} />
          </CardBody>
        </Card>
      )}
    </Container>
  );
};

