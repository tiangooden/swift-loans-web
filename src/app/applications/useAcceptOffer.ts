import { useState, useCallback } from 'react';
import { notifications } from '../shared/notifications';

export function useAcceptOffer() {
  const [accepting, setAccepting] = useState(false);
  const [acceptError, setAcceptError] = useState<string | null>(null);

  const acceptOffer = useCallback(async (offerId: string) => {
    setAccepting(true);
    setAcceptError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/offers/${offerId}/accept`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'accepted' }),
      });

      if (!response.ok) {
        throw new Error('Failed to accept offer');
      }

      notifications.success('Offer accepted successfully!');
      return true;
    } catch (err: any) {
      notifications.error(`Error accepting offer: ${err.message}`);
      setAcceptError(err.message);
      return false;
    } finally {
      setAccepting(false);
    }
  }, []);

  return { acceptOffer, accepting, acceptError };
}