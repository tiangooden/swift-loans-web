import { useState } from 'react';
import { notifications } from '@/app/shared/notifications';
import axios from 'axios';

export function useRejectApplicationReview() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const rejectApplicationReview = async (applicationId: string, data: { decision_reason: string }) => {
        setLoading(true);
        setError(null);
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${applicationId}/reject`, data);
            notifications.success('Application rejected successfully!');
            return true;
        } catch (error: any) {
            setError(error.message);
            console.error('Error rejecting application:', error);
            notifications.error(`Error rejecting application: ${error.message}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { rejectApplicationReview, loading, error };
}