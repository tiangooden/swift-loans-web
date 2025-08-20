import { useState } from 'react';
import { notifications } from '@/app/shared/notifications';

export function useRejectApplicationReview() {
    const [loading, setLoading] = useState(false);

    const rejectApplicationReview = async (applicationId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${applicationId}/reject`, {
                method: 'PATCH',
            });

            if (!response.ok) {
                throw new Error('Failed to reject application review');
            }

            notifications.success('Application review rejected successfully!');
            return true;
        } catch (error: any) {
            console.error('Error rejecting application review:', error);
            notifications.error(`Error rejecting application review: ${error.message}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { rejectApplicationReview, loading };
}