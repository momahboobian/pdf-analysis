import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import socket from "../../utils/socket";

import { FileUploadProps } from "../../types";
import { postRequest } from "../../services/api";

import Button from "../ui/Button/Button";
import { Icons } from "../ui/Icons/Icons";
import "./FileUpload.scss";

const FileUpload: React.FC<FileUploadProps> = ({
  files,
  setFiles,
  folderName,
  loading,
  setLoading,
  uploadCompleted,
  setUploadCompleted,
  onStartCalculation,
  onFileChange,
}) => {
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  // const [fileList, setFileList] = useState([]);
  // const [progress, setProgress] = useState<{
  //   [key: string]: number;
  // }>({});

  useEffect(() => {
    socket.on("upload_started", (data) => {
      console.log("Upload started", data);
    });

    socket.on("file_upload_progress", (data) => {
      console.log("Progress:", data);
    });

    socket.on("upload_complete", (data) => {
      console.log("Upload complete", data);
    });
    socket.on(
      "file_upload_progress",
      (data: { file_name: string; progress: number }) => {
        setUploadProgress((prev) => ({
          ...prev,
          [data.file_name]: data.progress,
        }));
      }
    );

    return () => {
      socket.off("file_upload_progress");
    };
  }, []);

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select a file to upload.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("files[]", file));
    formData.append("folder", folderName);

    setLoading(true);
    const uploadResponse = await postRequest("/upload", formData);
    if (uploadResponse.success) {
      toast.success("All files uploaded successfully.");
      setFiles([]);
      setUploadCompleted(true);
    } else {
      toast.error(uploadResponse.message || "File upload failed.");
    }

    setLoading(false);
  };

  const handleChooseFiles = async () => {
    setFiles([]);
    setUploadCompleted(false);
    setLoading(false);
    setTimeout(() => {
      document.getElementById("file-upload")?.click();
    }, 500);
  };

  return (
    <div className="file-upload">
      <div className="file-upload__header">Start Here</div>
      <div className="file-upload__actions">
        <input
          type="file"
          id="file-upload"
          className="file-upload__input"
          onChange={onFileChange}
          multiple
        />
        <Button
          icon={Icons.file({ className: "file-upload__icon" })}
          title="Choose Files"
          onClick={() => handleChooseFiles()}
        />
        <div className="file-upload__file-list">
          {loading && (
            <div className="file-upload__spinner">
              {Icons.spinner({ className: "file-upload__icon-spinner" })}
            </div>
          )}

          {uploadCompleted && files.length === 0 ? (
            <div className="file-upload__file-placeholder">
              Uploaded Completed. Press START CALCULATION button.
            </div>
          ) : files.length === 0 ? (
            <div className="file-upload__file-placeholder">
              You have no files selected...
            </div>
          ) : (
            <div className="file-upload__file-list-content">
              {files.map((file, index) => (
                <div key={index} className="file-upload__file-item">
                  {file.name}
                  <div className="file-upload__file-progress">
                    {uploadProgress[file.name] !== undefined ? (
                      <div
                        className="file-upload__file-progress-bar"
                        style={{ width: `${uploadProgress[file.name]}%` }}
                      >
                        {uploadProgress[file.name]}%
                      </div>
                    ) : (
                      <span>Waiting...</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="file-upload__upload-clear">
          <Button
            icon={Icons.upload({ className: "file-upload__icon" })}
            title="Upload"
            onClick={handleUpload}
          />
          <Button
            icon={Icons.clear({ className: "file-upload__icon" })}
            title="Clear Files"
            onClick={() => setFiles([])}
            disabled={files.length === 0}
          />
        </div>
      </div>
      <Button
        icon={Icons.action({ className: "file-upload__icon" })}
        title="Start Calculation"
        onClick={onStartCalculation}
        disabled={loading || (!uploadCompleted && files.length === 0)}
      />
    </div>
  );
};

export default FileUpload;
