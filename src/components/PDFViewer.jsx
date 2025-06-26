// --- client/src/components/PDFViewer.js ---
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function PDFViewer({ pdfUrl, onClose }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfLoading, setPdfLoading] = useState(true);
    const [pdfError, setPdfError] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPdfLoading(false);
    }

    function onDocumentLoadError(error) {
        console.error('Error loading PDF:', error);
        setPdfError('Failed to load PDF. It might be corrupted or inaccessible.');
        setPdfLoading(false);
    }

    const goToPrevPage = () => setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
    const goToNextPage = () => setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl relative w-full h-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-800">PDF Preview</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-800 text-2xl"
                    >
                        &times;
                    </button>
                </div>

                <div className="flex-grow overflow-auto p-4 flex justify-center items-start">
                    {pdfLoading && <p className="text-slate-600">Loading PDF...</p>}
                    {pdfError && <p className="text-red-500">{pdfError}</p>}
                    {!pdfLoading && !pdfError && (
                        <Document
                            file={pdfUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                            className="flex justify-center"
                        >
                            <Page
                                pageNumber={pageNumber}
                                width={Math.min(window.innerWidth * 0.7, 700)} // Responsive width
                                renderAnnotationLayer={true}
                                renderTextLayer={true}
                                loading={<p className="text-slate-600">Rendering page...</p>}
                                error={<p className="text-red-500">Error rendering page.</p>}
                            />
                        </Document>
                    )}
                </div>

                {!pdfLoading && !pdfError && numPages > 0 && (
                    <div className="p-4 border-t border-slate-200 flex justify-center items-center space-x-4">
                        <button
                            onClick={goToPrevPage}
                            disabled={pageNumber <= 1}
                            className="bg-indigo-100 text-indigo-600 py-1 px-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-200"
                        >
                            Previous
                        </button>
                        <span className="text-slate-700">Page {pageNumber} of {numPages}</span>
                        <button
                            onClick={goToNextPage}
                            disabled={pageNumber >= numPages}
                            className="bg-indigo-100 text-indigo-600 py-1 px-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-200"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PDFViewer;