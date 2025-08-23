import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { notifications } from '../../shared/notifications';
import axios from 'axios';
import { LoanApplication } from '../types';

export function useFetchApplication(id: string) {
    const { data: session, status } = useSession();
    const [application, setApplication] = useState<LoanApplication | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = (await (axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}`))).data;
            setApplication(data);
        } catch (err: any) {
            notifications.error(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { application, loading, error, fetchApplications };
}