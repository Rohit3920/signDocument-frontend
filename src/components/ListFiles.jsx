import React from 'react';

const ListFiles = ({ documents, onPreview }) => {
    // If no documents are provided or the array is empty, display a message.
    if (!documents || documents.length === 0) {
        return (
            <p className="text-gray-600 text-center p-4">No documents uploaded yet.</p>
        );
    }

    return (
        // Grid layout for displaying document cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {documents.map((doc) => {
                // Construct the URL for preview/download using the document's _id
                // Assumes your backend serves files at http://localhost:5000/api/documents/:id
                const fileDownloadUrl = `http://localhost:5000/api/documents/${doc._id}`;

                return (
                    <div
                        key={doc._id} // Use doc._id as the unique key
                        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between border border-gray-200"
                    >
                        <div>
                            {/* Document file name with truncation and tooltip */}
                            <h4
                                className="text-xl font-semibold text-gray-800 truncate mb-2"
                                title={doc.fileName} // Tooltip on hover
                            >
                                {doc.fileName}
                            </h4>
                            {/* File size in MB, formatted to two decimal places */}
                            <p className="text-sm text-gray-600 mb-1">
                                Size: {(doc.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            {/* Upload date, formatted to local date string */}
                            <p className="text-sm text-gray-600">
                                Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="mt-6 flex space-x-3">
                            {/* Preview button: calls onPreview with the full document object */}
                            <button
                                onClick={() => onPreview(doc)} // Pass the entire doc object
                                className="flex-1 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-md font-medium shadow-md transition-colors duration-200"
                            >
                                Preview
                            </button>
                            {/* Download link: opens the file in a new tab for download */}
                            <a
                                href={fileDownloadUrl} // Use the constructed download URL
                                target="_blank" // Open in new tab
                                rel="noopener noreferrer" // Security best practice
                                download={doc.fileName} // Suggests the original filename for download
                                className="flex-1 px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-md font-medium shadow-md transition-colors duration-200 text-center"
                            >
                                Download
                            </a>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ListFiles;