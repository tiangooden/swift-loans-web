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
    user: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    };
    documents?: {
        id: number;
        document_type: string;
        file_name: string;
        file_url: string;
        uploaded_at: string;
    }[];
    employments?: {
        employer_name: string;
        job_title: string;
        monthly_income: number;
        employment_length: string;
    }[];
    bank_account?: {
        bank_name: string;
        account_type: string;
        last_four: string;
    }[];
}

interface LoanOffer {
    id: number;
    principal: number;
    interest_rate: number;
    fee_amount: number;
    repayment_date: string;
    total_due: number;
    offer_status: string;
    created_at: string;
}

export function useLoanApplicationDetails(applicationId: string) {
    const { data: session, status } = useSession();
    const [application, setApplication] = useState<LoanApplication | null>(null);
    const [loanOffers, setLoanOffers] = useState<LoanOffer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchApplicationDetails = useCallback(async () => {
        if (status === 'loading' || !session || !applicationId) return;
        setLoading(true);
        setError(null);
        try {
            const [applicationResponse, offersResponse] = await Promise.all([
                fetch(`/api/applications/${applicationId}`),
                fetch(`/api/applications/${applicationId}/offers`)
            ]);

            if (!applicationResponse.ok) {
                throw new Error('Failed to fetch loan application details');
            }
            const appData = await applicationResponse.json();
            setApplication(appData);

            if (offersResponse.ok) {
                const offersData = await offersResponse.json();
                setLoanOffers(offersData);
            } else {
                setLoanOffers([]); // No offers found or error fetching offers
            }
        } catch (err: any) {
            notifications.error(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [session, status, applicationId]);

    useEffect(() => {
        fetchApplicationDetails();
    }, [fetchApplicationDetails]);

    return { application, loanOffers, loading, error, fetchApplicationDetails };
}

export function useUpdateLoanApplicationStatus() {
    const [updating, setUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const updateStatus = useCallback(async (applicationId: number, newStatus: string, reason?: string) => {
        setUpdating(true);
        setUpdateError(null);
        try {
            const response = await fetch(`/api/applications/${applicationId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus, decision_reason: reason }),
            });

            if (!response.ok) {
                throw new Error('Failed to update application status');
            }
            notifications.success('Application status updated successfully!');
            return true;
        } catch (err: any) {
            notifications.error(err.message);
            setUpdateError(err.message);
            return false;
        } finally {
            setUpdating(false);
        }
    }, []);

    return { updateStatus, updating, updateError };
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