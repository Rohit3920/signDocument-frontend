import React from 'react';

function DocumentCard({ document, onView }) {
    const uploadDate = new Date(document.uploadDate).toLocaleDateString();

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-slate-200">
            <div className="p-4">
                <h3 className="text-xl font-semibold text-slate-800 truncate mb-2" title={document.fileName}>{document.fileName}</h3>
                <p className="text-sm text-slate-500 mb-3">Uploaded: {uploadDate}</p>
                <button
                    onClick={onView}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    View Document
                </button>
            </div>
        </div>
    );
}

export default DocumentCard;