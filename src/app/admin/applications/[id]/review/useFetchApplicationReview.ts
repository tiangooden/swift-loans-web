import { useState, useEffect } from 'react';
import { LoanApplication } from './types';
import axios from 'axios';

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
      const data = (await axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}/review`)).data;
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
