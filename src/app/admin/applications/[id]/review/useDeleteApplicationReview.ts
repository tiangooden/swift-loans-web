import { useState } from 'react';
import { notifications } from '@/app/shared/notifications';

export function useDeleteApplicationReview() {
    const [loading, setLoading] = useState(false);

    const deleteApplicationReview = async (applicationId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${applicationId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete application');
            }

            notifications.success('Application deleted successfully!');
            return true;
        } catch (error: any) {
            console.error('Error deleting application:', error);
            notifications.error(`Error deleting application: ${error.message}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { deleteApplicationReview, loading };
}