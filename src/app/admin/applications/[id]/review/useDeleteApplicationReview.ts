import { useState } from 'react';
import { notifications } from '@/app/shared/notifications';
import axios from 'axios';

export function useDeleteApplicationReview() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteApplicationReview = async (applicationId: string) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${applicationId}`);
            notifications.success('Application deleted successfully!');
            return true;
        } catch (error: any) {
            setError(error.message);
            console.error('Error deleting application:', error);
            notifications.error(`Error deleting application: ${error.message}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { deleteApplicationReview, loading, error };
}