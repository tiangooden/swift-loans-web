'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Check, X, DollarSign, Clock, User, Mail, Phone, MapPin, Briefcase, Building, CreditCard, Calendar, AlertCircle } from 'lucide-react';
import AdminNav from '@/app/admin/components/AdminNav';

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
    bank_accounts: [{
      bank_name: string;
      account_type: string;
      account_number: string;
      routing_number: string;
      is_primary: boolean;
    }] | null;
    employment_details: {
      employer_name: string;
      job_title: string;
      start_date: string;
      monthly_income: number;
      employment_type: string;
      payday_day: string;
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

export default function LoanReviewPage() {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [counterOfferAmount, setCounterOfferAmount] = useState('');
  const [counterOfferRate, setCounterOfferRate] = useState('');
  const [counterOfferTerm, setCounterOfferTerm] = useState('');
  const [showCounterOffer, setShowCounterOffer] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, [params.id]);

  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/admin/applications/${params.id}`);
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
      const response = await fetch(`/api/admin/applications/${params.id}/action`, {
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

      router.push('/admin/loans');
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

  if (loading) {
    return (
      <AdminNav>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </AdminNav>
    );
  }

  if (!application) {
    return (
      <AdminNav>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Application Not Found</h2>
              <p className="text-gray-600 mb-4">The loan application you're looking for doesn't exist.</p>
              <button
                onClick={() => router.push('/admin/loans')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Back to Loans
              </button>
            </div>
          </div>
        </div>
      </AdminNav>
    );
  }

  return (
    <AdminNav>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Loan Application Review</h1>
                  <p className="text-sm text-gray-500 mt-1">Application #{application.id}</p>
                </div>
                <button
                  onClick={() => router.push('/admin/loans')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Status Banner */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                    {application.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="ml-4 text-sm text-gray-600">
                    Submitted: {new Date(application.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Application Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Loan Request */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Loan Request
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Amount Requested</label>
                        <p className="text-lg font-semibold text-gray-900">${application.amount_requested.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Term</label>
                        <p className="text-lg font-semibold text-gray-900">{application.term_in_days} days</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Purpose</label>
                        <p className="text-gray-900">{application.purpose}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Employment Status</label>
                        <p className="text-gray-900 capitalize">{application.employment_status}</p>
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                        <p className="text-gray-900">{application.users.first_name} {application.users.last_name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="text-gray-900">{application.users.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p className="text-gray-900">{application.users.phone_number}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Address</label>
                        <p className="text-gray-900">{application.users.street_address}, {application.users.city}, {application.users.state} {application.users.zip_code}</p>
                      </div>
                    </div>
                  </div>

                  {/* Employment Details */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Briefcase className="h-5 w-5 mr-2" />
                      Employment Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Employer</label>
                        <p className="text-gray-900">{application.users.employment_details?.employer_name || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Job Title</label>
                        <p className="text-gray-900">{application.users.employment_details?.job_title || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Employment Type</label>
                        <p className="text-gray-900">{application.users.employment_details?.employment_type}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Monthly Salary</label>
                        <p className="text-gray-900">${application.users.employment_details?.monthly_income || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Pay Day</label>
                        <p className="text-gray-900">{application.users.employment_details?.payday_day ?
                          new Date(application.users.employment_details.payday_day).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bank Account */}
                  {
                    application.users.bank_accounts?.map(({ bank_name, account_number }, key) =>
                      <div key={key} className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <CreditCard className="h-5 w-5 mr-2" />
                          Bank Account
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Bank Name</label>
                            <p className="text-gray-900">{bank_name || 'N/A'}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Account Number</label>
                            <p className="text-gray-900">
                              {account_number ? `****${account_number.slice(-4)}` : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>

                {/* Right Column - Actions & Summary */}
                <div className="space-y-6">
                  {/* Financial Summary */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Monthly Income</span>
                        {/* <span className="font-medium">${application.monthly_income.toLocaleString()}</span> */}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Credit Score</span>
                        <span className="font-medium">{application.credit_score}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Debt-to-Income</span>
                        <span className="font-medium text-green-600">Low</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => handleAction('approve')}
                        disabled={actionLoading}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </button>

                      <button
                        onClick={() => handleAction('reject')}
                        disabled={actionLoading}
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </button>

                      <button
                        onClick={() => setShowCounterOffer(!showCounterOffer)}
                        disabled={actionLoading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                      >
                        Counter Offer
                      </button>

                      {showCounterOffer && (
                        <div className="space-y-3 pt-4 border-t">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                            <input
                              type="number"
                              value={counterOfferAmount}
                              onChange={(e) => setCounterOfferAmount(e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2"
                              placeholder="Enter amount"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={counterOfferRate}
                              onChange={(e) => setCounterOfferRate(e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2"
                              placeholder="Enter rate"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Term (days)</label>
                            <input
                              type="number"
                              value={counterOfferTerm}
                              onChange={(e) => setCounterOfferTerm(e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2"
                              placeholder="Enter term"
                            />
                          </div>
                          <button
                            onClick={() => handleAction('counter_offer', {
                              amount: counterOfferAmount,
                              interest_rate: counterOfferRate,
                              term: counterOfferTerm
                            })}
                            disabled={actionLoading || !counterOfferAmount || !counterOfferRate || !counterOfferTerm}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                          >
                            Send Counter Offer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminNav>
  );
}