import { notifications } from '@/app/shared/notifications';
import { useState } from 'react';

export const useDeleteOffer = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteOffer = async (offerId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/offers/${offerId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to delete offer');
            }
            const data = await response.json();
            notifications.success(data.message || 'Offer deleted successfully!');
            return true;
        } catch (err: any) {
            setError(err.message);
            notifications.error(err.message || 'Error deleting offer');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { deleteOffer, loading, error };
};