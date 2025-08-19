'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useAcceptLoanOffer, useLoanApplicationDetails, useRejectLoanOffer } from '../hooks';
import { getStatusColor, getStatusIcon } from '@/app/shared/status';
import formatDateString from '@/app/shared/date';

export default function LoanApplicationDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const { application, loading, error, fetchApplicationDetails } = useLoanApplicationDetails(params.id as string);
    const { acceptOffer, accepting, acceptError } = useAcceptLoanOffer();
    const { rejectOffer, rejecting, rejectError } = useRejectLoanOffer();

    const handleAcceptOffer = async (offerId: string) => {
        const success = await acceptOffer(offerId);
        if (success) {
            fetchApplicationDetails();
        }
    };

    const handleRejectOffer = async (offerId: string) => {
        const success = await rejectOffer(offerId);
        if (success) {
            fetchApplicationDetails();
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading application details...</div>;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error: {error}</h2>
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
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                                {getStatusIcon(application.status)}
                                <span className="ml-1 capitalize">{application.status}</span>
                            </span>
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
                                                <dd className="text-gray-900">{formatCurrency(application.employments[0].monthly_income)}</dd>
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

                    {/* Loan Offers */}
                    <div className="lg:col-span-3 bg-white rounded-lg shadow">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Loan Offers</h2>
                            {application.offers.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Rate</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term in Days</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Offered</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {application.offers.map((offer: any) => (
                                                <tr key={offer.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(offer.principal)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.interest_rate}%</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.term_in_days}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(offer.status)}`}>
                                                            {getStatusIcon(offer.status)}&nbsp;{offer.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateString(offer.created_at)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        {offer.status === 'offered' && (
                                                            <div className="flex items-center space-x-2">
                                                                <button
                                                                    onClick={() => handleAcceptOffer(offer.id)}
                                                                    className="text-green-600 hover:text-green-900"
                                                                    title="Accept Offer"
                                                                >
                                                                    <Check className="h-5 w-5" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleRejectOffer(offer.id)}
                                                                    className="text-red-600 hover:text-red-900"
                                                                    title="Reject Offer"
                                                                >
                                                                    <X className="h-5 w-5" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-500">No loan offers available for this application yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}