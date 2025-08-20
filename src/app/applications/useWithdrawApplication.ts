import { useState, useCallback } from 'react';
import { notifications } from '../shared/notifications';

export function useWithdrawApplication() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const withdrawApplication = useCallback(async (applicationId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${applicationId}/withdraw`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'rejected' }),
            });
            if (!response.ok) {
                throw new Error('Failed to reject offer');
            }
            notifications.success('Offer rejected successfully!');
            return true;
        } catch (err: any) {
            notifications.error(`Error rejecting offer: ${err.message}`);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    return { withdrawApplication, loading, error };
}