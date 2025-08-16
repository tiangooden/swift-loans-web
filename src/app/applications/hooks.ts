import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { notifications } from '../shared/notifications';

interface LoanApplication {
  id: number;
  amount_requested: number;
  term_in_days: number;
  purpose: string;
  status: string;
  submitted_at: string;
  decided_at?: string;
  decision_reason?: string;
}

export function useFetchLoanApplications() {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    if (status === 'loading' || !session) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/applications');
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
  }, [fetchApplications]);

  return { applications, loading, error, fetchApplications };
}

export function useSaveLoanApplication() {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const saveApplication = useCallback(async (data: any, id?: number) => {
    setSaving(true);
    setSaveError(null);
    const url = id ? `/api/applications/${id}` : '/api/applications';
    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${id ? 'update' : 'submit'} loan application`);
      }
      notifications.success(`${id ? 'Updated' : 'Submitted'} loan application successfully!`);
      return true;
    } catch (err: any) {
      notifications.error(err.message);
      setSaveError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  return { saveApplication, saving, saveError };
}

export function useDeleteLoanApplication() {
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteApplication = useCallback(async (id: number) => {
    setDeleting(true);
    setDeleteError(null);
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete loan application');
      }
      notifications.success('Loan application deleted successfully!');
      return true;
    } catch (err: any) {
      notifications.error(err.message);
      setDeleteError(err.message);
      return false;
    } finally {
      setDeleting(false);
    }
  }, []);

  return { deleteApplication, deleting, deleteError };
}