import { useState } from 'react';
import { notifications } from '@/app/shared/notifications';
import axios from 'axios';

export function useApproveApplicationReview() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const approveApplicationReview = async (applicationId: string) => {
        setLoading(true);
        setError(null);
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${applicationId}/approve`);
            notifications.success('Application approved successfully!');
            return true;
        } catch (error: any) {
            setError(error.message);
            console.error('Error approving application:', error);
            notifications.error(`Error approving application: ${error.message}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { approveApplicationReview, loading, error };
}