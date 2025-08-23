import { useState } from 'react';
import { notifications } from '../shared/notifications';
import axios from 'axios';

export function useWithdrawApplication() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const withdrawApplication = async (applicationId: string) => {
        setLoading(true);
        setError(null);
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${applicationId}/withdraw`, { status: 'rejected' });
            notifications.success('Offer rejected successfully!');
            return true;
        } catch (err: any) {
            notifications.error(`Error rejecting offer: ${err.message}`);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { withdrawApplication, loading, error };
}