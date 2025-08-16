import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LoanApplication, LoanOffer } from '@/app/shared/types';

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
      const response = await fetch(`/api/admin/applications/${applicationId}/action`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          ...offerData,
        }),
      });

      if (!response.ok) throw new Error('Action failed');

      router.push('/admin/applications');
    } catch (error) {
      console.error('Error performing action:', error);
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