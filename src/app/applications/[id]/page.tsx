'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useLoanApplicationDetails, useUpdateLoanApplicationStatus } from '../hooks';

export default function LoanApplicationDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const { application, loanOffers, loading, error, fetchApplicationDetails } = useLoanApplicationDetails(params.id as string);
    const { updateStatus } = useUpdateLoanApplicationStatus();

    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            cancelled: 'bg-gray-100 text-gray-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return <CheckCircle className="h-4 w-4" />;
            case 'rejected':
                return <XCircle className="h-4 w-4" />;
            case 'pending':
                return <Clock className="h-4 w-4" />;
            default:
                return <Clock className="h-4 w-4" />;
        }
    };

    const handleStatusUpdate = async (newStatus: string, reason?: string) => {
        const success = await updateStatus(application!.id, newStatus, reason);
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
                                Loan Application #{application.id}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                {new Date(application.submitted_at).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Application Details */}
                    <div className="lg:col-span-1 bg-white shadow-lg rounded-xl">
                        <div className="p-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Details</h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                    <div className="bg-gray-50 rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Loan Request</h3>
                                        <div className="grid grid-cols-3 gap-4">
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
                                                    {new Date(application.decided_at!).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
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
                    <div className="lg:col-span-1 bg-white rounded-lg shadow">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Loan Offers</h2>
                            {loanOffers.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Rate</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Due</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repayment Date</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {loanOffers.map((offer) => (
                                                <tr key={offer.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(offer.principal)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(offer.interest_rate * 100).toFixed(2)}%</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(offer.fee_amount)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(offer.total_due)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(offer.repayment_date).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(offer.offer_status)}`}>
                                                            {offer.offer_status}
                                                        </span>
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