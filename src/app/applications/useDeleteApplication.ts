import { useState, useCallback } from "react";
import { notifications } from "../shared/notifications";

export function useDeleteApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteApplication = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete loan application');
      }
      notifications.success('Loan application deleted successfully!');
      return true;
    } catch (err: any) {
      notifications.error(err.message);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteApplication, loading, error };
}