import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { notifications } from '../shared/notifications';
import { LoanApplication } from './types';

export function useLoanApplicationDetails(id: string) {
    const { data: session, status } = useSession();
    const [application, setApplication] = useState<LoanApplication | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchApplicationDetails = useCallback(async () => {
        if (status === 'loading' || !session || !id) return;
        setLoading(true);
        setError(null);
        try {
            const applicationResponse = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}`);

            if (!applicationResponse.ok) {
                throw new Error('Failed to fetch loan application details');
            }
            const appData = await applicationResponse.json();
            setApplication(appData);
        } catch (err: any) {
            notifications.error(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [session, status, id]);

    useEffect(() => {
        fetchApplicationDetails();
    }, []);

    return { application, loading, error, fetchApplicationDetails };
}