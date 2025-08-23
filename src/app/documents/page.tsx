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
            setSelectedFiles(null);
        }
    }, [success]);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                    <FileText className="w-8 h-8 text-blue-600 mr-3" />
                    <h1 className="text-3xl font-bold text-gray-800">Upload Documents</h1>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input type="file" id="upload" className="hidden" multiple onChange={handleFileChange} />
                    <label htmlFor="upload" className="cursor-pointer text-blue-600 hover:text-blue-800">
                        Click to upload or drag and drop files here
                    </label>
                    {selectedFiles && selectedFiles.length > 0 && (
                        <div className="mt-2 text-gray-700">
                            Selected files: {Array.from(selectedFiles).map(file => file.name).join(', ')}
                        </div>
                    )}
                </div>
                <div className="mt-8 text-center">
                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out disabled:bg-blue-400 flex items-center justify-center gap-2 mx-auto w-fit"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Uploading...
                            </>
                        ) : 'Upload All Documents'}
                    </button>
                </div>
            </div>
        </div>
    );
}