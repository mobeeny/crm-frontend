// import React, { useState } from "react";
// import axios from "axios";

// const FileUpload = () => {
//     const [selectedFiles, setSelectedFiles] = useState([]);

//     const handleFileChange = (event) => {
//         setSelectedFiles([...event.target.files]);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const formData = new FormData();
//         selectedFiles.forEach((file) => {
//             formData.append("files", file);
//         });

//         try {
//             await axios.post("http://localhost:3000/upload", formData);
//             console.log("Files uploaded successfully");
//         } catch (error) {
//             console.error("Error uploading files:", error);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input type="file" multiple onChange={handleFileChange} />
//                 <button type="submit">Upload Files</button>
//             </form>
//         </div>
//     );
// };

// export default FileUpload;

import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFiles([...event.target.files]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        setSelectedFiles(files);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        selectedFiles.forEach((file) => {
            formData.append("files", file);
        });

        try {
            await axios.post("http://localhost:3000/upload", formData);
            console.log("Files uploaded successfully");
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} onDrop={handleDrop} onDragOver={handleDragOver}>
                <div className="drop-zone" onDrop={handleDrop} onDragOver={handleDragOver} s>
                    upload
                </div>
                <input type="file" multiple onChange={handleFileChange} />
                <button type="submit">Upload Files</button>
            </form>
        </div>
    );
};

export default FileUpload;
