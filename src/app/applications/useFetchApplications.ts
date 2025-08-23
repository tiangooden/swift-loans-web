import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { notifications } from '../shared/notifications';
import { LoanApplication } from './types';
import axios from 'axios';

export function useFetchApplications() {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = (await axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications`)).data;
      setApplications(data);
    } catch (err: any) {
      notifications.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { applications, loading, error, fetchApplications };
}