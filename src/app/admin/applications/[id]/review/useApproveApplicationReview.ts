import { useState } from 'react';
import { notifications } from '@/app/shared/notifications';

export function useApproveApplicationReview() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const approveApplicationReview = async (applicationId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${applicationId}/approve`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Failed to approve application review');
            }
            notifications.success('Application review approved successfully!');
            return true;
        } catch (error: any) {
            setError(error.message);
            console.error('Error approving application review:', error);
            notifications.error(`Error approving application review: ${error.message}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { approveApplicationReview, loading, error };
}