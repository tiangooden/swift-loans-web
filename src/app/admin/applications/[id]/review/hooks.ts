import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { notifications } from '@/app/shared/notifications';

interface LoanApplication {
  id: string;
  amount_requested: number;
  term_in_days: number;
  status: string;
  created_at: string;
  purpose: string;
  monthly_income: number;
  users: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    street_address: string;
    city: string;
    state: string;
    zip_code: string;
    date_of_birth: string;
    ssn: string;
    bank_account: {
      bank_name: string;
      branch_name: string;
      account_name: string;
      account_type: string;
      account_number: string;
    } | null;
    employment: {
      employer_name: string;
      job_title: string;
      start_date: string;
      monthly_income: number;
      payday_day: number;
    } | null;
  },
  offers: [];
}

export function useLoanApplicationReview() {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [counterOfferAmount, setCounterOfferAmount] = useState('');
  const [counterOfferRate, setCounterOfferRate] = useState('');
  const [counterOfferTerm, setCounterOfferTerm] = useState('');
  const [showCounterOffer, setShowCounterOffer] = useState(false);

  const id = params.id as string;

  useEffect(() => {
    if (id) {
      fetchApplication();
    }
  }, [id]);

  const fetchApplication = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}/review`);
      if (!response.ok) throw new Error('Failed to fetch application');
      const data = await response.json();
      setApplication(data);
    } catch (error) {
      console.error('Error fetching application:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: string, data?: any) => {
    setActionLoading(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}/`;
      let method = 'POST';
      if (action === 'approve') {
        url = url + `approve`;
      } else if (action === 'reject') {
        url = url + `reject`;
        method = 'PATCH';
      } else if (action === 'counter') {
        url = url + `counter-offer`;
      } else {
        throw new Error('Invalid action');
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Action failed');
      }

      notifications.success('Action performed successfully!')
      router.push('/admin/applications');
    } catch (error: any) {
      notifications.error(`Error performing action:, ${error}`)
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'under_review': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return {
    application,
    loading,
    actionLoading,
    counterOfferAmount,
    setCounterOfferAmount,
    counterOfferRate,
    setCounterOfferRate,
    counterOfferTerm,
    setCounterOfferTerm,
    showCounterOffer,
    setShowCounterOffer,
    fetchApplication,
    handleAction,
    getStatusColor,
  };
}