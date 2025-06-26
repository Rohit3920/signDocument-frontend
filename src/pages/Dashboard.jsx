import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import DocumentCard from '../components/DocumentCard';
import PDFViewer from '../components/PDFViewer';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDocumentUrl, setSelectedDocumentUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const res = await api.get('/docs');
                setDocuments(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching documents:', err.response?.data || err.message);
                setError('Failed to load documents. Please try again.');
                setLoading(false);
                if (err.response && err.response.status === 401) {
                    navigate('/login');
                }
            }
        };
        fetchDocuments();
    }, [navigate]);

    const handleViewDocument = (documentId) => {
        setSelectedDocumentUrl(`http://localhost:5000/api/docs/${documentId}`);
    };

    const handleClosePdfViewer = () => {
        setSelectedDocumentUrl(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-xl text-slate-700">Loading documents...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-red-500 text-xl">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Your Documents</h2>
            {documents.length === 0 ? (
                <p className="text-center text-slate-600 text-lg">No documents uploaded yet. Upload one to get started!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map((doc) => (
                        <DocumentCard
                            key={doc._id}
                            document={doc}
                            onView={() => handleViewDocument(doc._id)}
                        />
                    ))}
                </div>
            )}

            {selectedDocumentUrl && (
                <PDFViewer
                    pdfUrl={selectedDocumentUrl}
                    onClose={handleClosePdfViewer}
                />
            )}
        </div>
    );
}

export default Dashboard;