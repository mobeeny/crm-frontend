import React, { useState } from "react";
import axios from "axios";

const UploadComponent = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState([]);

    const handleFileSelection = (event) => {
        setSelectedFiles([...event.target.files]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append("files", file);
        });

        try {
            const response = await axios.post("/upload", formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setUploadProgress((prevProgress) => [...prevProgress, progress]);
                },
            });

            console.log(response.data); // Handle the response from the server
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFileSelection} />
            <button onClick={handleUpload}>Upload</button>
            {uploadProgress.map((progress, index) => (
                <div key={index}>{progress}%</div>
            ))}
        </div>
    );
};

export default UploadComponent;
