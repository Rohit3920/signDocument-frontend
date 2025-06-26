import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import {useNavigate} from 'react-router-dom'

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [document, setDocument] = useState()
    // const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            setMessage('');
        } else {
            setSelectedFile(null);
            setMessage('Please select a valid PDF file.');
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setMessage('No file selected for upload.');
            return;
        }

        setIsLoading(true);
        setMessage('Uploading file...');

        const formData = new FormData();
        formData.append('pdfDocument', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/api/docs/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setDocument(response.data.document)
            setMessage(response.data.message || 'Upload successful!');
            setSelectedFile(null);
        } catch (error) {
            console.error('Error uploading file:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(`Upload failed: ${error.response.data.message}`);
            } else {
                setMessage('File upload failed! Please try again. Network error or server not reachable.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Upload Document</h3>

            <div className="w-full mb-4">
                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                    Select PDF File:
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>

            {selectedFile && (
                <div className="w-full bg-gray-50 p-3 rounded-md border border-gray-200 mb-4">
                    <p className="text-sm text-gray-600">
                        Selected: <span className="font-medium text-gray-800">{selectedFile.name}</span> ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                </div>
            )}

            <button
                onClick={handleFileUpload}
                disabled={isLoading || !selectedFile}
                className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-300
            ${isLoading || !selectedFile
                        ? 'bg-blue-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 shadow-md'
                    }`}
            >
                {isLoading ? 'Uploading...' : 'Upload PDF'}
            </button>

            {message && (
                <p className={`mt-4 text-center text-sm font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default FileUpload;
