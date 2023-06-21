import React, { useState } from "react";
import axios from "axios";

function FileUploadForm() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const config = {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(progress);
                },
            };

            axios
                .post("/upload", formData, config)
                .then((response) => {
                    // File uploaded successfully
                    console.log(response.data);
                })
                .catch((error) => {
                    // Handle upload error
                    console.error(error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
            {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
        </form>
    );
}

export default FileUploadForm;
