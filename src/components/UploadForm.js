export default function UploadForm ({ onFileChange }) {
  return (
    <div>
      <input type="file" onChange={onFileChange} />
    </div>
  );
};

