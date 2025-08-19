'use client';

import { Check, X, DollarSign, Clock, User, Mail, Phone, MapPin, Briefcase, Building, CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/app/admin/components/AdminNav';
import { useLoanApplicationReview } from './hooks';
import { useState } from 'react';
import { notifications } from '@/app/shared/notifications';
import formatDateString from '@/app/shared/date';

export default function LoanReviewPage() {
  const router = useRouter();
  const { application, loading, actionLoading, counterOfferAmount,
    setCounterOfferAmount, counterOfferRate, setCounterOfferRate,
    counterOfferTerm, setCounterOfferTerm, showCounterOffer, setShowCounterOffer,
    handleAction, getStatusColor } = useLoanApplicationReview();

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [decisionReason, setDecisionReason] = useState('');

  const handleRejectClick = () => {
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    if (decisionReason.trim() === '') {
      notifications.info('Please provide a reason for rejection.')
      return;
    }
    handleAction('reject', { decision_reason: decisionReason });
    setShowRejectModal(false);
    setDecisionReason('');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading application review...</div>;
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
                onClick={() => router.push('/admin/applications')}
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
    <>
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
                    onClick={() => router.push('/admin/applications')}
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
                      {formatDateString(application.created_at)}
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
                      <div className="grid grid-cols-3 gap-4">
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
                    < div className="bg-gray-50 rounded-lg p-6" >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Briefcase className="h-5 w-5 mr-2" />
                        Employment Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Employer</label>
                          <p className="text-gray-900">{application.users.employment?.employer_name || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Job Title</label>
                          <p className="text-gray-900">{application.users.employment?.job_title || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Monthly Salary</label>
                          <p className="text-gray-900">${application.users.employment?.monthly_income || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Pay Day</label>
                          <p className="text-gray-900">{application.users.employment?.payday_day}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Bank Account
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Bank Name</label>
                          <p className="text-gray-900">{application.users.bank_account?.bank_name || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Branch Name</label>
                          <p className="text-gray-900">{application.users.bank_account?.branch_name || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Account Name</label>
                          <p className="text-gray-900">{application.users.bank_account?.account_name || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Account Type</label>
                          <p className="text-gray-900">{application.users.bank_account?.account_type || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Account Number</label>
                          <p className="text-gray-900">{application.users.bank_account?.account_number || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Actions & Summary */}
                  <div className="space-y-6">
                    {/* Actions */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                      <div className="space-y-3">
                        <button
                          onClick={() => handleAction('approve', {
                            amount: application.amount_requested,
                            interest_rate: 25,//todo
                            term: application.term_in_days
                          })}
                          disabled={actionLoading}
                          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </button>

                        <button
                          onClick={handleRejectClick}
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
                              onClick={() => handleAction('counter', {
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
      </AdminNav >

      {/* Reject Reason Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Reason for Rejection</h2>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              rows={4}
              placeholder="Please provide a detailed reason for rejecting this application..."
              value={decisionReason}
              onChange={(e) => setDecisionReason(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                disabled={actionLoading}
                className="px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}