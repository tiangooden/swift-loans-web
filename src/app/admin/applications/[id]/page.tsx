'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { notifications } from '@/app/shared/notifications';
import { useFetchApplicationReview } from './useFetchApplicationReview';
import { useApproveApplicationReview } from './useApproveApplicationReview';
import { useRejectApplicationReview } from './useRejectApplicationReview';
import { useCounterOfferApplicationReview } from './useCounterOfferApplicationReview';
import AdminNav from '@/app/admin/components/AdminNav';
import { useDeleteOffer } from './useDeleteOffer';
import { useDownloadSignedApproval } from './useDownloadSignedApproval';
import { counterOfferSchema } from '@/app/api/offers/schema';
import FormButton from '@/app/shared/component/FormButton';
import FormTextArea from '@/app/shared/component/FormTextArea';
import formatDateString from '@/app/shared/date';
import { getStatusColor } from '@/app/shared/status';
import { processValidationErrors } from '@/app/shared/utils/createMessageMap';
import { validateSchema } from '@/app/shared/validation';
import { X, DollarSign, User, Briefcase } from 'lucide-react';
import LoadingOverlayWrapper from 'react-loading-overlay-ts';
import AdminLoanOffers from './components/AdminLoanOffers';
import FormInput from '@/app/shared/component/FormInput';

export default function LoanReviewPage() {
  const router = useRouter();
  const id = (useParams()).id?.toString();
  const { data: application, isPending: loading } = useFetchApplicationReview(id);
  const { mutateAsync: approveApplicationReview, isPending: approveLoading } = useApproveApplicationReview();
  const { mutateAsync: rejectApplicationReview, isPending: rejectLoading } = useRejectApplicationReview();
  const { mutateAsync: counterOfferApplicationReview, isPending: counterLoading } = useCounterOfferApplicationReview();
  const { mutateAsync: deleteOffer, isPending: isDeleting } = useDeleteOffer();
  const { mutateAsync: downloadSignedApproval, isPending: isDownloading } = useDownloadSignedApproval();
  const [counterOfferAmount, setCounterOfferAmount] = useState(0);
  const [counterOfferRate, setCounterOfferRate] = useState(0);
  const [counterOfferTerm, setCounterOfferTerm] = useState(0);
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
    try {
      await rejectApplicationReview({ id: id as string, decision_reason: decisionReason });
      setDecisionReason('');
      notifications.success('Application rejected successfully!');
    } catch (err) {
      notifications.error(`Failed to reject application: ${err}`);
    }
  }

  return (
    <>
      <AdminNav>
        <LoadingOverlayWrapper active={loading} spinner text='Loading application...'>
          <LoadingOverlayWrapper active={approveLoading} spinner text='Approving application...'>
            <LoadingOverlayWrapper active={rejectLoading} spinner text='Rejecting application...'>
              <LoadingOverlayWrapper active={counterLoading} spinner text='Countering application...'>
                <LoadingOverlayWrapper active={isDeleting} spinner text='Deleting offer...'>
                  <LoadingOverlayWrapper active={isDownloading} spinner text='Downloaing signed approval...'>
                    <div className="min-h-screen bg-gray-50 py-8">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white shadow rounded-lg">
                          {/* Header */}
                          <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <h1 className="text-2xl font-bold text-gray-900">Loan Application Review</h1>
                                <p className="text-sm text-gray-500 mt-1">Application: {application?.id}</p>
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
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application?.status!)}`}>
                                  {application?.status.replace('_', ' ').toUpperCase()}
                                </span>
                                <span className="ml-4 text-sm text-gray-600">
                                  {formatDateString(application?.created_at)}
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
                                      <p className="text-lg font-semibold text-gray-900">${application?.amount_requested.toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Term</label>
                                      <p className="text-lg font-semibold text-gray-900">{application?.term_in_days} days</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Purpose</label>
                                      <p className="text-gray-900">{application?.purpose}</p>
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
                                      <p className="text-gray-900">{application?.user.first_name} {application?.user.last_name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Email</label>
                                      <p className="text-gray-900">{application?.user.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Phone</label>
                                      <p className="text-gray-900">{application?.user.phone_number}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Address</label>
                                      <p className="text-gray-900">{application?.user.street_address}, {application?.user.city}, {application?.user.state} {application?.user.zip_code}</p>
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
                                      <p className="text-gray-900">{application?.user.employment?.employer_name || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Job Title</label>
                                      <p className="text-gray-900">{application?.user.employment?.job_title || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Monthly Salary</label>
                                      <p className="text-gray-900">${application?.user.employment?.gross_salary || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Pay Day</label>
                                      <p className="text-gray-900">{application?.user.employment?.payday_day}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Right Column - Actions & Summary */}
                              <div className="space-y-6">
                                {/* Actions */}
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                                  <div className="flex flex-col space-y-3">
                                    <FormButton
                                      onClick={async () => {
                                        const success = await approveApplicationReview(id as string);
                                        if (success) {
                                          notifications.success('Application approved successfully!');
                                        }
                                        if (success) {
                                          notifications.success('Application approved successfully!');
                                        }
                                      }}
                                      disabled={approveLoading}
                                    >
                                      {approveLoading ? 'Approving...' : 'Approve Application'}
                                    </FormButton>
                                    <FormButton
                                      onClick={handleRejectClick}
                                      color='red'
                                    >
                                      Reject Application
                                    </FormButton>
                                    <FormButton
                                      onClick={() => setShowCounterOffer(true)}
                                      color='gray'
                                    >
                                      Counter Offer
                                    </FormButton>
                                    {showCounterOffer && (
                                      <div className="space-y-3 pt-4 border-t">
                                        <div>
                                          <FormInput
                                            type="number"
                                            value={counterOfferAmount}
                                            onChange={(e) => setCounterOfferAmount(parseFloat(e.target.value))}
                                            placeholder="Amount" label={''} id={'counterOfferAmount'}
                                            name={'counterOfferAmount'} />
                                        </div>
                                        <div>
                                          <FormInput
                                            type="number"
                                            value={counterOfferRate}
                                            onChange={(e) => setCounterOfferRate(parseFloat(e.target.value))}
                                            placeholder="Rate (%)" label={''} id={'counterOfferRate'}
                                            name={'counterOfferRate'} />
                                        </div>
                                        <div>
                                          <FormInput
                                            type="number"
                                            value={counterOfferTerm}
                                            onChange={(e) => setCounterOfferTerm(parseFloat(e.target.value))}
                                            placeholder="Term (days)" label={''} id={'counterOfferTerm'}
                                            name={'counterOfferTerm'} />
                                        </div>
                                        <FormButton
                                          onClick={async () => {
                                            try {
                                              validateSchema({
                                                amount: counterOfferAmount,
                                                interest_rate: counterOfferRate,
                                                term: counterOfferTerm
                                              }, counterOfferSchema);
                                              await counterOfferApplicationReview({
                                                id,
                                                data: {
                                                  amount: counterOfferAmount,
                                                  interest_rate: counterOfferRate,
                                                  term_in_days: counterOfferTerm,
                                                }
                                              });
                                              notifications.success('Application counter-offered successfully!');
                                            } catch (err: any) {
                                              //   notifications.error(`Failed to send counter offer: ${err}`);
                                            } finally {
                                              // Always clear state and close modal regardless of success or failure
                                              setShowCounterOffer(false);
                                              setCounterOfferAmount(0);
                                              setCounterOfferRate(0);
                                              setCounterOfferTerm(0);
                                            }
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
                            <AdminLoanOffers
                              applicationId={application?.id!}
                              offers={application?.offers!}
                              deleteOffer={deleteOffer}
                              isDeleting={isDeleting}
                              downloadSignedApproval={downloadSignedApproval}
                              isDownloading={isDownloading}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </LoadingOverlayWrapper>
                </LoadingOverlayWrapper>
              </LoadingOverlayWrapper>
            </LoadingOverlayWrapper>
          </LoadingOverlayWrapper>
        </LoadingOverlayWrapper>
      </AdminNav >

      {
        showRejectModal && (
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
                  color="red"
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
        )
      }
    </>
  );
}