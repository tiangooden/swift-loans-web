import { notifications } from '@/app/shared/notifications';
import { useState } from 'react';
import axios from 'axios';

export const useCounterOfferApplicationReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const counterOfferApplicationReview = async (applicationId: string, data: any) => {
    setLoading(true);
    setError(null);
    try {
      await axios.patch(`/api/applications/${applicationId}/counter-offer`, data);
      notifications.success('Application counter-offered successfully!');
      return true;
    } catch (e: any) {
      console.error('Error counter offering application:', error);
      notifications.error('Failed to counter offer application.');
      setError(e.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { counterOfferApplicationReview, loading, error };
};