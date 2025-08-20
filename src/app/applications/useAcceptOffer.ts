import { useState, useCallback } from 'react';
import { notifications } from '../shared/notifications';

export function useAcceptOffer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const acceptOffer = useCallback(async (offerId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/offers/${offerId}/accept`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to accept offer');
      }

      notifications.success('Offer accepted successfully!');
      return true;
    } catch (err: any) {
      notifications.error(`Error accepting offer: ${err.message}`);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { acceptOffer, loading, error };
}