'use client';

import { DollarSign, User, Briefcase, AlertCircle, X } from 'lucide-react';
import AdminLoanOffers from './components/AdminLoanOffers';
import { useParams, useRouter } from 'next/navigation';
import AdminNav from '@/app/admin/components/AdminNav';
import { useState } from 'react';
import { notifications } from '@/app/shared/notifications';
import formatDateString from '@/app/shared/date';
import { getStatusColor } from '@/app/shared/status';
import { useFetchApplicationReview } from './useFetchApplicationReview';
import { useApproveApplicationReview } from './useApproveApplicationReview';
import { useRejectApplicationReview } from './useRejectApplicationReview';
import { useCounterOfferApplicationReview } from './useCounterOfferApplicationReview';
import FormButton from '@/app/shared/component/FormButton';
import FormInput from '@/app/shared/component/FormInput';
import FormTextArea from '@/app/shared/component/FormTextArea';

export default function LoanReviewPage() {
  const router = useRouter();
  const id = (useParams()).id?.toString();
  const { data: application, isPending: loading, error } = useFetchApplicationReview(id);
  const { mutateAsync: approveApplicationReview, isPending: approveLoading } = useApproveApplicationReview();
  const { mutateAsync: rejectApplicationReview, isPending: rejectLoading } = useRejectApplicationReview();
  const { mutateAsync: counterOfferApplicationReview, isPending: counterLoading } = useCounterOfferApplicationReview();

  const [counterOfferAmount, setCounterOfferAmount] = useState('');
  const [counterOfferRate, setCounterOfferRate] = useState('');
  const [counterOfferTerm, setCounterOfferTerm] = useState('');
  const [showCounterOffer, setShowCounterOffer] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [decisionReason, setDecisionReason] = useState('');

  const handleRejectClick = () => {
    setShowRejectModal(true);
  };

  const confirmReject = async () => {
    if (decisionReason.trim() === '') {
      notifications.info('Please provide a reason for rejection.')
      return;
    }
    await rejectApplicationReview({ id: id as string, decision_reason: decisionReason });
    router.push('/admin/applications');
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
              <FormButton
                onClick={() => router.push('/admin/applications')}
              >
                Back to Loans
              </FormButton>
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
                    <p className="text-sm text-gray-500 mt-1">Application: {application.id}</p>
                  </div>
                  <FormButton
                    onClick={() => router.push('/admin/applications')}
                  >
                    <X className="h-6 w-6" />
                  </FormButton>
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
                          <p className="text-gray-900">{application.user.first_name} {application.user.last_name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email</label>
                          <p className="text-gray-900">{application.user.email}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Phone</label>
                          <p className="text-gray-900">{application.user.phone_number}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Address</label>
                          <p className="text-gray-900">{application.user.street_address}, {application.user.city}, {application.user.state} {application.user.zip_code}</p>
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
                          <p className="text-gray-900">{application.user.employment?.employer_name || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Job Title</label>
                          <p className="text-gray-900">{application.user.employment?.job_title || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Monthly Salary</label>
                          <p className="text-gray-900">${application.user.employment?.gross_salary || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Pay Day</label>
                          <p className="text-gray-900">{application.user.employment?.payday_day}</p>
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
                        <FormButton
                          onClick={async () => {
                            const success = await approveApplicationReview(id as string);
                            if (success) {
                              router.push('/admin/applications');
                            }
                          }}
                          disabled={approveLoading}
                        >
                          {approveLoading ? 'Approving...' : 'Approve Application'}
                        </FormButton>

                        <FormButton
                          onClick={handleRejectClick}
                        >
                          Reject Application
                        </FormButton>

                        <FormButton
                          onClick={() => setShowCounterOffer(true)}
                        >
                          Counter Offer
                        </FormButton>

                        {showCounterOffer && (
                          <div className="space-y-3 pt-4 border-t">
                            <div>
                              <FormInput
                                type="number"
                                value={counterOfferAmount}
                                onChange={(e) => setCounterOfferAmount(e.target.value)}
                                placeholder="Amount" label={''} id={''} name={''} />
                            </div>
                            <div>
                              <FormInput
                                type="number"
                                value={counterOfferRate}
                                onChange={(e) => setCounterOfferRate(e.target.value)}
                                placeholder="Rate (%)" label={''} id={''} name={''} />
                            </div>
                            <div>
                              <FormInput
                                type="number"
                                value={counterOfferTerm}
                                onChange={(e) => setCounterOfferTerm(e.target.value)}
                                placeholder="Term (days)" label={''} id={''} name={''} />
                            </div>
                            <FormButton
                              onClick={async () => {
                                await counterOfferApplicationReview({
                                  id,
                                  data: { amount: counterOfferAmount, interest_rate: parseFloat(counterOfferRate), term_in_days: parseInt(counterOfferTerm) }
                                });
                                setShowCounterOffer(false);
                                router.push('/admin/applications');
                              }}
                              disabled={counterLoading}
                            >
                              {counterLoading ? 'Sending...' : 'Send Counter Offer'}
                            </FormButton>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50">
                {/* Loan Offers */}
                <AdminLoanOffers
                  applicationId={application.id}
                  offers={application.offers}
                />
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
            <FormTextArea
              value={decisionReason}
              onChange={(e) => setDecisionReason(e.target.value)}
              rows={4}
              placeholder="Reason for rejection..." label={''} id={''} name={''} />
            <div className="flex justify-end space-x-4">
              <FormButton
                onClick={() => setShowRejectModal(false)}
              >
                Cancel
              </FormButton>
              <FormButton
                onClick={confirmReject}
              >
                Confirm Rejection
              </FormButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}