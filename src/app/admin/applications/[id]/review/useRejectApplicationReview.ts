import { useState } from 'react';
import { notifications } from '@/app/shared/notifications';

export function useRejectApplicationReview() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const rejectApplicationReview = async (applicationId: string, data: { decision_reason: string }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${applicationId}/reject`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Failed to reject application review');
            }
            notifications.success('Application review rejected successfully!');
            return true;
        } catch (error: any) {
            setError(error.message);
            console.error('Error rejecting application review:', error);
            notifications.error(`Error rejecting application review: ${error.message}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { rejectApplicationReview, loading, error };
}