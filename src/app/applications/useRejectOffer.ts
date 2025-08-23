import { useState } from 'react';
import { notifications } from '../shared/notifications';
import axios from 'axios';

export function useRejectOffer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rejectOffer = async (offerId: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/offers/${offerId}/reject`);
      notifications.success('Offer rejected successfully!');
      return true;
    } catch (err: any) {
      notifications.error(`Error rejecting offer: ${err.message}`);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { rejectOffer, loading, error };
}