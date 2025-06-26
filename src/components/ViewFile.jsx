import React from "react";

const ViewFile = ({ document, onClose }) => {

    console.log("Document : ",document)
    if (!document) {
        return null;
    }


    const fileUrl = `http://localhost:5000/api/documents/${document._id}`;
    const fileName = document.fileName; 

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col transform scale-95 opacity-0 animate-scale-in">
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
                    <h3 className="text-2xl font-extrabold text-gray-900 truncate pr-4" title={fileName}>
                        Preview: {fileName}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-900 text-4xl font-bold transition-colors duration-200 p-2 leading-none"
                        aria-label="Close preview"
                    >
                        &times;
                    </button>
                </div>

                <div className="flex-grow border border-gray-300 rounded-lg overflow-hidden bg-gray-100 shadow-inner">
                    <iframe
                        src={fileUrl} 
                        title={`PDF Preview of ${fileName}`} 
                        className="w-full h-full border-none" 
                        frameBorder="0" 
                        loading="lazy"
                    >
\
                        <p className="p-4 text-center text-gray-700">
                            Your browser does not support inline PDF viewing. You can download the PDF
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={fileName}
                                className="text-blue-600 hover:underline ml-1"
                            >
                                here
                            </a>.
                        </p>
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default ViewFile;