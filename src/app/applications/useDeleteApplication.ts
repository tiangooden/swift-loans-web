import { useState } from "react";
import { notifications } from "../shared/notifications";
import axios from 'axios';

export function useDeleteApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteApplication = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}`);
      notifications.success('Loan application deleted successfully!');
      return true;
    } catch (err: any) {
      notifications.error(err.message);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteApplication, loading, error };
}