import { useState } from 'react';
import axios from 'axios';
import { notifications } from '../shared/notifications';

export const useDeleteFile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteFile = async (key: string) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/file/${key}`);
            notifications.success('File deleted successfully');
        } catch (err: any) {
            notifications.error('Failed to delete file');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { deleteFile, loading, error };
};