import { notifications } from '@/app/shared/notifications';
import { useState } from 'react';

export const useCounterOfferApplicationReview = () => {
  const [loading, setLoading] = useState(false);

  const counterOfferApplicationReview = async (applicationId: string, data: any) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/applications/${applicationId}/counter-offer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to counter offer application');
      }
      notifications.success('Application counter-offered successfully!');
      return true;
    } catch (error) {
      console.error('Error counter offering application:', error);
      notifications.error('Failed to counter offer application.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { counterOfferApplicationReview, loading };
};