import { useState, useEffect } from 'react';
import { LoanApplication } from './types';

export function useFetchApplicationReview(id: string) {
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}/review`);
      if (!response.ok) throw new Error('Failed to fetch application');
      const data = await response.json();
      setApplication(data);
    } catch (error: any) {
      console.error('Error fetching application:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { application, loading, error, fetchApplication };
}
