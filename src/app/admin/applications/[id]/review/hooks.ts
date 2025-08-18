import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface LoanApplication {
  id: string;
  amount_requested: number;
  term_in_days: number;
  status: string;
  created_at: string;
  purpose: string;
  employment_status: string;
  monthly_income: number;
  credit_score: number;
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
  };
}

interface LoanOffer {
  id: string;
  amount_offered: number;
  interest_rate: number;
  term_in_days: number;
  monthly_payment: number;
  total_interest: number;
  total_amount: number;
  status: string;
  created_at: string;
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

  const applicationId = params.id as string;

  useEffect(() => {
    if (applicationId) {
      fetchApplication();
    }
  }, [applicationId]);

  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`);
      if (!response.ok) throw new Error('Failed to fetch application');
      const data = await response.json();
      setApplication(data);
    } catch (error) {
      console.error('Error fetching application:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: string, offerData?: any) => {
    setActionLoading(true);
    try {
      const response = await fetch(`/api/applications/${applicationId}/offers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: action,
          ...offerData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Action failed: ${errorData.error || 'Unknown error'}`);
        throw new Error('Action failed');
      }

      alert('Action performed successfully!');
      router.push('/admin/applications');
    } catch (error: any) {
      console.error('Error performing action:', error);
      alert(`Error: ${error.message || 'An unexpected error occurred'}`);
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