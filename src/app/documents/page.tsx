'use client';

import { FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFileUpload } from '../hooks/useFileUpload';

export default function DocumentsPage() {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const { uploadFiles, loading, error, success } = useFileUpload();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = async () => {
        if (selectedFiles) {
            await uploadFiles(selectedFiles);
        }
    };

    useEffect(() => {
        if (success) {
            alert('Files uploaded successfully!');
            setSelectedFiles(null);
        }
        if (error) {
            alert(`File upload failed: ${error}`);
        }
    }, [success, error]);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                    <FileText className="w-8 h-8 text-blue-600 mr-3" />
                    <h1 className="text-3xl font-bold text-gray-800">Upload Documents</h1>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Identification Documents</h2>
                    <p className="text-gray-600 mb-4">Please upload clear copies of your identification documents (e.g., Driver's License, Passport, National ID).</p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input type="file" id="identification-upload" className="hidden" multiple onChange={handleFileChange} />
                        <label htmlFor="identification-upload" className="cursor-pointer text-blue-600 hover:text-blue-800">
                            Click to upload or drag and drop files here
                        </label>
                        {selectedFiles && selectedFiles.length > 0 && (
                            <div className="mt-2 text-gray-700">
                                Selected files: {Array.from(selectedFiles).map(file => file.name).join(', ')}
                            </div>
                        )}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bank Statements</h2>
                    <p className="text-gray-600 mb-4">Please upload your most recent bank statements (e.g., last 3 months).</p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input type="file" id="bank-statements-upload" className="hidden" multiple onChange={handleFileChange} />
                        <label htmlFor="bank-statements-upload" className="cursor-pointer text-blue-600 hover:text-blue-800">
                            Click to upload or drag and drop files here
                        </label>
                        {selectedFiles && selectedFiles.length > 0 && (
                            <div className="mt-2 text-gray-700">
                                Selected files: {Array.from(selectedFiles).map(file => file.name).join(', ')}
                            </div>
                        )}
                    </div>
                </section>

                <div className="mt-8 text-center">
                    <button
                        onClick={handleUpload}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out"
                    >
                        Upload All Documents
                    </button>
                </div>
            </div>
        </div>
    );
}