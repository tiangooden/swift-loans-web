import { useState } from 'react';
import axios from 'axios';

interface UseFileUploadResult {
  uploadFiles: (files: FileList) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const useFileUpload = (): UseFileUploadResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const uploadFiles = async (files: FileList) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await axios.post('/api/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess(true);
      } else {
        setError('File upload failed.');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError('An unexpected error occurred.');
      }
      console.error('Error uploading files:', err);
    } finally {
      setLoading(false);
    }
  };

  return { uploadFiles, loading, error, success };
};