import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { notifications } from '../shared/notifications';
import { LoanApplication } from './types';

export function useFetchApplications() {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SWIFT_LOANS_API + '/api/applications');
      if (!response.ok) {
        throw new Error('Failed to fetch loan applications');
      }
      const data = await response.json();
      setApplications(data);
    } catch (err: any) {
      notifications.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session, status]);

  useEffect(() => {
    fetchApplications();
  }, []);

  return { applications, loading, error, fetchApplications };
}