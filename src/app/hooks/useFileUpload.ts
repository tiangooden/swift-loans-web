import { useState } from 'react';
import axios from 'axios';
import { notifications } from '../shared/notifications';

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
      await axios.post(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/file`, formData);
      notifications.success('Files uploaded successfully');
      setSuccess(true);
    } catch (err: any) {
      notifications.error('Failed to uploaded files');
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { uploadFiles, loading, error, success };
};