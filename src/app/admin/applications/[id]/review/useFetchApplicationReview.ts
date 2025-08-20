import { useState, useEffect } from 'react';
import { LoanApplication } from './types';

export function useFetchApplicationReview(id: string) {
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}/review`);
      if (!response.ok) throw new Error('Failed to fetch application');
      const data = await response.json();
      setApplication(data);
    } catch (error) {
      console.error('Error fetching application:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    application,
    loading,
    fetchApplication,
  };
}
