import { useState } from 'react';
import { notifications } from '../shared/notifications';
import axios from 'axios';

export function useSaveApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveApplication = async (data: any, id?: string) => {
    setLoading(true);
    setError(null);
    const url = id ?
      `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}` :
      process.env.NEXT_PUBLIC_SWIFT_LOANS_API + '/api/applications';
    try {
      id ? await axios.put(url, data) :
        await axios.post(url, data);
      notifications.success('Loan application saved successfully!');
      return true;
    } catch (err: any) {
      notifications.error(`Error saving loan application: ${err.message}`);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { saveApplication, loading, error };
}