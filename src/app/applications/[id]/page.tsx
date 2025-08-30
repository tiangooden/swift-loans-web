'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Trash } from 'lucide-react';
import LoanOffers from './components/LoanOffers';
import { getStatusColor, getStatusIcon } from '@/app/shared/status';
import formatDateString from '@/app/shared/date';
import { useFetchApplication } from './useFetchApplication';
import formatCurrency from '@/app/shared/currency';
import { useWithdrawApplication } from './useWithdrawApplication';
import { notifications } from '@/app/shared/notifications';
import { useAcceptOffer } from './useAcceptOffer';
import { useGenerateApprovalLetter } from './useGenerateApprovalLetter';
import { useRejectOffer } from './useRejectOffer';
import { useUploadApprovalLetter } from './useUploadApprovalLetter';
import { useFileUpload } from '@/app/documents/useFileUpload';
import downloadFileInBrowser from '@/app/shared/download';
import LoadingOverlayWrapper from 'react-loading-overlay-ts';

export default function LoanApplicationDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const { data: application, isFetching: loading } = useFetchApplication(params.id as string);
    const { mutateAsync: withdrawApplication, isPending: withdrawing } = useWithdrawApplication();
    const { mutateAsync: acceptOffer, isPending: accepting } = useAcceptOffer();
    const { mutateAsync: rejectOffer, isPending: rejecting } = useRejectOffer();
    const { mutateAsync: generateApprovalLetter, isPending: isGeneratingApprovalLetter } = useGenerateApprovalLetter();
    const { mutateAsync: uploadApprovalLetter, isPending: isUploadingApprovalLetter } = useUploadApprovalLetter();
    const { mutateAsync: uploadFiles, isPending: isUploadingFiles } = useFileUpload();

    const handleWithdraw = async () => {
        if (application) {
            await withdrawApplication(application.id);
            notifications.success('Application withdrawn successfully!');
        }
    };

    const handleAcceptOffer = async (offerId: string) => {
        await acceptOffer(offerId);
        notifications.success('Offer accepted successfully!');
    };

    const handleRejectOffer = async (offerId: string) => {
        await rejectOffer(offerId);
        notifications.success('Offer rejected successfully!');
    };

    const handleDownloanApprovalLetter = async (id: string) => {
        const res = await generateApprovalLetter(id);
        downloadFileInBrowser('approval.pdf', res);
        notifications.success('Approval letter generated successfully!');
    }

    const handleUploadApprovalLetter = async (offerId: string, file: File) => {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        const key = await uploadFiles(dataTransfer.files);
        await uploadApprovalLetter({ offerId, key });
        notifications.success('Approval letter uploaded successfully!');
    };

    if (!application) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Not Found</h2>
                    <button
                        onClick={() => router.push('/applications')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Back to Applications
                    </button>
                </div>
            </div>
        );
    }

    return (
        <LoadingOverlayWrapper active={accepting} spinner text='Accepting offer...'>
            <LoadingOverlayWrapper active={rejecting} spinner text='Rejecting offer...'>
                <LoadingOverlayWrapper active={isGeneratingApprovalLetter} spinner text='Generating approval letter...'>
                    <LoadingOverlayWrapper active={isUploadingApprovalLetter} spinner text='Uploading approval letter...'>
                        <LoadingOverlayWrapper active={isUploadingFiles} spinner text='Uploading files...'>
                            <div className="min-h-screen bg-gray-50">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-8">
                                    {/* Header */}
                                    <div className="mb-6">
                                        <button
                                            onClick={() => router.push('/applications')}
                                            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                                        >
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Back to Applications
                                        </button>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h1 className="text-3xl font-bold text-gray-900">
                                                    Loan Application: {application.id}
                                                </h1>
                                                <p className="text-gray-600 mt-1">
                                                    {formatDateString(application.submitted_at)}
                                                </p>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                                                    {getStatusIcon(application.status)}
                                                    <span className="ml-1 capitalize">{application.status}</span>
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={handleWithdraw}
                                                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
                                                >
                                                    <Trash className="h-5 w-5 mr-2" /> Withdraw Application
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                        {/* Application Details */}
                                        <div className="lg:col-span-1 bg-white shadow-lg rounded-xl">
                                            <div className="p-8">
                                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Details</h2>
                                                <div className="space-y-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                                        <div className="bg-gray-50 rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Request</h3>
                                                            <div className="grid grid-cols-1 gap-4">
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500">Amount Requested</dt>
                                                                    <dd className="text-gray-900">{formatCurrency(application.amount_requested)}</dd>
                                                                </div>
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500">Term</dt>
                                                                    <dd className="text-gray-900">{application.term_in_days} days</dd>
                                                                </div>
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500">Purpose</dt>
                                                                    <dd className="text-gray-900">{application.purpose || 'Not specified'}</dd>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {application.user && (
                                                            <div className="bg-gray-50 rounded-lg p-4">
                                                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Applicant Information</h3>
                                                                <dl className="space-y-3">
                                                                    <div>
                                                                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                                                                        <dd className="text-gray-900">
                                                                            {application.user.first_name} {application.user.last_name}
                                                                        </dd>
                                                                    </div>
                                                                    <div>
                                                                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                                        <dd className="text-gray-900">{application.user.email}</dd>
                                                                    </div>
                                                                    <div>
                                                                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                                        <dd className="text-gray-900">{application.user.phone}</dd>
                                                                    </div>
                                                                </dl>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {application.employments && (
                                                        <div className="bg-gray-50 rounded-lg p-4">
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Details</h3>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500">Employer</dt>
                                                                    <dd className="text-gray-900">{application.employments[0].employer_name}</dd>

                                                                </div>
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500">Job Title</dt>
                                                                    <dd className="text-gray-900">{application.employments[0].job_title}</dd>
                                                                </div>
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500">Monthly Income</dt>
                                                                    <dd className="text-gray-900">{formatCurrency(application.employments[0].gross_salary)}</dd>
                                                                </div>
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500">Employment Length</dt>
                                                                    <dd className="text-gray-900">{application.employments[0].employment_length}</dd>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {application.bank_account && (
                                                        <div className="bg-gray-50 rounded-lg p-4">
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Account</h3>
                                                            <dl className="space-y-3">
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500">Bank Name</dt>
                                                                    <dd className="text-gray-900">{application.bank_account[0].bank_name}</dd>
                                                                </div>
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500">Account Type</dt>
                                                                    <dd className="text-gray-900 capitalize">{application.bank_account[0].account_type}</dd>
                                                                </div>
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500">Account Number</dt>
                                                                    <dd className="text-gray-900">****{application.bank_account[0].last_four}</dd>
                                                                </div>
                                                            </dl>
                                                        </div>
                                                    )}

                                                    {application.decided_at && (
                                                        <div className="bg-gray-50 rounded-lg p-4">
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Decision Details</h3>
                                                            <dl className="space-y-3">
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500">Decision Date</dt>
                                                                    <dd className="text-gray-900">
                                                                        {formatDateString(application.decided_at!)}
                                                                    </dd>
                                                                </div>
                                                                {application.decision_reason && (
                                                                    <div>
                                                                        <dt className="text-sm font-medium text-gray-500">Reason</dt>
                                                                        <dd className="text-gray-900">{application.decision_reason}</dd>
                                                                    </div>
                                                                )}
                                                            </dl>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <LoanOffers
                                            offers={application.offers}
                                            isGeneratingApprovalLetter={isGeneratingApprovalLetter}
                                            handleAcceptOffer={handleAcceptOffer}
                                            handleRejectOffer={handleRejectOffer}
                                            handleDownloanApprovalLetter={handleDownloanApprovalLetter}
                                            handleUploadApprovalLetter={handleUploadApprovalLetter}
                                        />
                                    </div>
                                </div>
                            </div>
                        </LoadingOverlayWrapper>
                    </LoadingOverlayWrapper>
                </LoadingOverlayWrapper>
            </LoadingOverlayWrapper>
        </LoadingOverlayWrapper>
    );
}