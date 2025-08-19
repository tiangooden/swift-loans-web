import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { notifications } from '../shared/notifications';

interface LoanApplication {
  offers: any;
  id: string;
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

export function useLoanApplicationDetails(id: string) {
  const { data: session, status } = useSession();
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplicationDetails = useCallback(async () => {
    if (status === 'loading' || !session || !id) return;
    setLoading(true);
    setError(null);
    try {
      const applicationResponse = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}`);

      if (!applicationResponse.ok) {
        throw new Error('Failed to fetch loan application details');
      }
      const appData = await applicationResponse.json();
      setApplication(appData);
    } catch (err: any) {
      notifications.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session, status, id]);

  useEffect(() => {
    fetchApplicationDetails();
  }, [fetchApplicationDetails]);

  return { application, loading, error, fetchApplicationDetails };
}

export function useAcceptLoanOffer() {
  const [accepting, setAccepting] = useState(false);
  const [acceptError, setAcceptError] = useState<string | null>(null);

  const acceptOffer = useCallback(async (offerId: string) => {
    setAccepting(true);
    setAcceptError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/offers/${offerId}/accept`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'accepted' }),
      });

      if (!response.ok) {
        throw new Error('Failed to accept offer');
      }

      notifications.success('Offer accepted successfully!');
      return true;
    } catch (err: any) {
      notifications.error(`Error accepting offer: ${err.message}`);
      setAcceptError(err.message);
      return false;
    } finally {
      setAccepting(false);
    }
  }, []);

  return { acceptOffer, accepting, acceptError };
}

export function useRejectLoanOffer() {
  const [rejecting, setRejecting] = useState(false);
  const [rejectError, setRejectError] = useState<string | null>(null);

  const rejectOffer = useCallback(async (offerId: string) => {
    setRejecting(true);
    setRejectError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/offers/${offerId}/reject`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject offer');
      }

      notifications.success('Offer rejected successfully!');
      return true;
    } catch (err: any) {
      notifications.error(`Error rejecting offer: ${err.message}`);
      setRejectError(err.message);
      return false;
    } finally {
      setRejecting(false);
    }
  }, []);

  return { rejectOffer, rejecting, rejectError };
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
  }, [fetchApplications]);

  return { applications, loading, error, fetchApplications };
}

export function useSaveLoanApplication() {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const saveApplication = useCallback(async (data: any, id?: number) => {
    setSaving(true);
    setSaveError(null);
    const url = id ? `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}` : process.env.NEXT_PUBLIC_SWIFT_LOANS_API + '/api/applications';
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
      setDeleteError(err.message);
      return false;
    } finally {
      setDeleting(false);
    }
  }, []);

  return { deleteApplication, deleting, deleteError };
}