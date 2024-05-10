// UploadForm.js
import React from 'react';

const UploadForm = ({ onFileChange }) => {
  return (
    <div>
      <input type="file" onChange={onFileChange} />
    </div>
  );
};

export default UploadForm;
