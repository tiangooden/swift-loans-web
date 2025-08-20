import { useState, useCallback } from 'react';
import { notifications } from '../shared/notifications';

export function useSaveApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveApplication = useCallback(async (data: any, id?: string) => {
    setLoading(true);
    setError(null);
    const url = id ? `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}` : process.env.NEXT_PUBLIC_SWIFT_LOANS_API + '/api/applications';
    const method = id ? 'PUT' : 'POST';
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to save loan application: ${response.statusText}`);
      }
      notifications.success('Loan application saved successfully!');
      return true;
    } catch (err: any) {
      notifications.error(`Error saving loan application: ${err.message}`);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { saveApplication, loading, error };
}