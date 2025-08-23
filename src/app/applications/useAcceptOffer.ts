import { useState } from 'react';
import { notifications } from '../shared/notifications';
import axios from 'axios';

export function useAcceptOffer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const acceptOffer = async (offerId: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/offers/${offerId}/accept`);
      notifications.success('Offer accepted successfully!');
      return true;
    } catch (err: any) {
      notifications.error(`Error accepting offer: ${err.message}`);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { acceptOffer, loading, error };
}