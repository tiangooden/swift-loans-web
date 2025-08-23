import { useEffect, useState } from 'react';
import axios from 'axios';
import { notifications } from '../shared/notifications';

export const useFetchFile = () => {
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchFiles();
    }, [])

    const fetchFiles = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/file`);
            setDocuments(response.data);
        } catch (err: any) {
            notifications.error('Failed to fetch documents');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { fetchFiles, loading, error, documents };
};