'use client';

import { useParams, useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { notifications } from '@/app/lib/notifications';
import { useFetchApplicationReview } from './useFetchApplicationReview';
import { useApproveApplicationReview } from './useApproveApplicationReview';
import { useRejectApplicationReview } from './useRejectApplicationReview';
import { useCounterOfferApplicationReview } from './useCounterOfferApplicationReview';
import AdminNav from '@/app/admin/components/AdminNav';
import { useDeleteOffer } from './useDeleteOffer';
import { useDownloadSignedApproval } from './useDownloadSignedApproval';
import FormButton from '@/app/lib/component/FormButton';
import FormTextArea from '@/app/lib/component/FormTextArea';
import formatDateString from '@/app/lib/date';
import { getStatusColor } from '@/app/lib/status';
import { processValidationErrors } from '@/app/lib/processValidationErrors';
import { validateSchema } from '@/app/lib/validation';
import { X, DollarSign, User, Briefcase } from 'lucide-react';
import LoadingOverlayWrapper from 'react-loading-overlay-ts';
import AdminLoanOffers from './components/AdminLoanOffers';
import FormInput from '@/app/lib/component/FormInput';
import { counterOfferSchema } from '@/app/api/applications/[id]/counter-offer/schema';
import { rejectApplicationSchema } from '@/app/api/applications/[id]/reject/schema';

export default function LoanReviewPage() {
  const router = useRouter();
  const id = (useParams()).id?.toString() || '';
  const { data: application, isPending: loading } = useFetchApplicationReview(id);
  const { mutateAsync: approveApplicationReview, isPending: approveLoading } = useApproveApplicationReview();
  const { mutateAsync: rejectApplicationReview, isPending: rejectLoading } = useRejectApplicationReview();
  const { mutateAsync: counterOfferApplicationReview, isPending: counterLoading } = useCounterOfferApplicationReview();
  const { mutateAsync: deleteOffer, isPending: isDeleting } = useDeleteOffer();
  const { mutateAsync: downloadSignedApproval, isPending: isDownloading } = useDownloadSignedApproval();
  const [counterOfferData, setCounterOfferData] = useState({
    principal: 0,
    interest_rate: 0,
    term_in_days: 0,
  });
  const [showCounterOffer, setShowCounterOffer] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [decisionReason, setDecisionReason] = useState('');
  const [errors, setErrors] = useState(new Map<string, string>);

  const handleRejectClick = () => {
    setErrors(new Map());
    setShowRejectModal(true);
  };

  const confirmReject = async () => {
    try {
      validateSchema({ decision_reason: decisionReason }, rejectApplicationSchema);
    } catch (err: any) {
      notifications.error(`Failed to reject application: ${err.statusMessage}`);
      setErrors(processValidationErrors(err.errors));
      return;
    }
    try {
      await rejectApplicationReview({ id, decision_reason: decisionReason });
      setDecisionReason('');
      notifications.success('Application rejected successfully!');
    } catch (err: any) {
      notifications.error(`Failed to reject application: ${err.statusMessage}`);
      setErrors(processValidationErrors(err.errors));
      return;
    }
  }

  async function handleCounterOffer(e: FormEvent<Element>): Promise<void> {
    try {
      validateSchema(counterOfferData, counterOfferSchema);
    } catch (err: any) {
      return setErrors(processValidationErrors(err.errors));
    }
    try {
      await counterOfferApplicationReview({ id, data: counterOfferData });
      setShowCounterOffer(false);
      setCounterOfferData({
        principal: 0,
        interest_rate: 0,
        term_in_days: 0,
      });
      notifications.success('Application countered successfully!');
    } catch (err: any) {
      notifications.error(`Failed to send counter offer: ${err.statusMessage}`);
      return setErrors(processValidationErrors(err.errors));
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
                              <div className="lg:col-span-2 space-y-6">
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
                              <div className="space-y-6">
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
                                      onClick={() => setShowCounterOffer(!showCounterOffer)}
                                      color='gray'
                                    >
                                      Counter Offer
                                    </FormButton>
                                    {showCounterOffer && (
                                      <div className="space-y-3 pt-4 border-t">
                                        <div>
                                          <FormInput
                                            type="number"
                                            value={counterOfferData.principal}
                                            onChange={(e) => setCounterOfferData({ ...counterOfferData, principal: parseFloat(e.target.value) })}
                                            placeholder="Principal"
                                            label={'Principal'}
                                            id={'principal'}
                                            name={'principal'}
                                            error={errors.get('principal')}
                                          />
                                        </div>
                                        <div>
                                          <FormInput
                                            type="number"
                                            value={counterOfferData.interest_rate}
                                            onChange={(e) => setCounterOfferData({ ...counterOfferData, interest_rate: parseFloat(e.target.value) })}
                                            placeholder="Rate (%)"
                                            label={'Interest Rate'}
                                            id={'interest_rate'}
                                            name={'interest_rate'}
                                            error={errors.get('interest_rate')}
                                          />
                                        </div>
                                        <div>
                                          <FormInput
                                            type="number"
                                            value={counterOfferData.term_in_days}
                                            onChange={(e) => setCounterOfferData({ ...counterOfferData, term_in_days: parseFloat(e.target.value) })}
                                            placeholder="Term (days)"
                                            label={'Term (days)'}
                                            id={'term_in_days'}
                                            name={'term_in_days'}
                                            error={errors.get('term_in_days')}
                                          />
                                        </div>
                                        <FormButton
                                          onClick={handleCounterOffer}
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
                placeholder="Reason for rejection..."
                label={''}
                id={'decision_reason'}
                name={'decision_reason'}
                error={errors.get('decision_reason')}
              />
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