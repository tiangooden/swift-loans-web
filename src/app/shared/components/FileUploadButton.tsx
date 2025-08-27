'use client';

import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadButtonProps {
    onFileUpload: (file: File) => void;
    title?: string;
    className?: string;
}

export default function FileUploadButton({
    onFileUpload,
    title = 'Upload File',
    className = 'text-blue-600 hover:text-blue-900',
}: FileUploadButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileUpload(file);
        }
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                type="button"
                onClick={handleButtonClick}
                className={className}
                title={title}
            >
                <Upload className="h-5 w-5" />
            </button>
        </>
    );
}