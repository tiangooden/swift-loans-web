'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Download, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

interface LoanApplication {
    id: number;
    amount_requested: number;
    term_in_days: number;
    purpose: string;
    status: string;
    submitted_at: string;
    decided_at?: string;
    decision_reason?: string;
    user: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    };
    documents?: {
        id: number;
        document_type: string;
        file_name: string;
        file_url: string;
        uploaded_at: string;
    }[];
    employment_details?: {
        employer_name: string;
        job_title: string;
        monthly_income: number;
        employment_length: string;
    };
    bank_account?: {
        bank_name: string;
        account_type: string;
        last_four: string;
    };
}

interface LoanOffer {
    id: number;
    principal: number;
    interest_rate: number;
    fee_amount: number;
    repayment_date: string;
    total_due: number;
    offer_status: string;
    created_at: string;
}

export default function LoanApplicationDetailsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams();
    const [application, setApplication] = useState<LoanApplication | null>(null);
    const [loanOffers, setLoanOffers] = useState<LoanOffer[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('details');

    useEffect(() => {
        if (status === 'loading') return;
        if (!session) {
            router.push('/api/auth/signin');
            return;
        }
        fetchApplicationDetails();
    }, [session, status, params.id]);

    const fetchApplicationDetails = async () => {
        try {
            const [applicationResponse, offersResponse] = await Promise.all([
                fetch(`/api/loan-applications/${params.id}`),
                fetch(`/api/loan-applications/${params.id}/offers`)
            ]);

            if (applicationResponse.ok) {
                const appData = await applicationResponse.json();
                console.log('Application data:', appData);

                setApplication(appData);
            }

            if (offersResponse.ok) {
                const offersData = await offersResponse.json();
                setLoanOffers(offersData);
            }
        } catch (error) {
            console.error('Error fetching application details:', error);
        } finally {
            setLoading(false);
        }
    };

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
        try {
            const response = await fetch(`/api/loan-applications/${params.id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus, decision_reason: reason }),
            });

            if (response.ok) {
                await fetchApplicationDetails();
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    if (status === 'loading' || loading) {
        return <div className="flex justify-center items-center h-screen">Loading applications...</div>;
    }

    if (!application) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Not Found</h2>
                    <button
                        onClick={() => router.push('/loan-applications')}
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => router.push('/loan-applications')}
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
                                {(new Date(application.submitted_at).toISOString())}
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

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('details')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Application Details
                            </button>
                            {/* <button
                                onClick={() => setActiveTab('documents')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'documents'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Documents ({application.documents?.length || 0})
                            </button> */}
                            <button
                                onClick={() => setActiveTab('offers')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'offers'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Loan Offers ({loanOffers.length})
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'details' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Request</h3>
                                        <dl className="space-y-3">
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Amount Requested</dt>
                                                <dd className="text-lg font-semibold text-gray-900">
                                                    {formatCurrency(application.amount_requested)}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Term</dt>
                                                <dd className="text-gray-900">{application.term_in_days} days</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Purpose</dt>
                                                <dd className="text-gray-900">{application.purpose || 'Not specified'}</dd>
                                            </div>
                                        </dl>
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

                                {application.employment_details && (
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Employer</dt>
                                                <dd className="text-gray-900">{application.employment_details.employer_name}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Job Title</dt>
                                                <dd className="text-gray-900">{application.employment_details.job_title}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Monthly Income</dt>
                                                <dd className="text-gray-900">{formatCurrency(application.employment_details.monthly_income)}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Employment Length</dt>
                                                <dd className="text-gray-900">{application.employment_details.employment_length}</dd>
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
                                                <dd className="text-gray-900">{application.bank_account.bank_name}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Account Type</dt>
                                                <dd className="text-gray-900 capitalize">{application.bank_account.account_type}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Account Number</dt>
                                                <dd className="text-gray-900">****{application.bank_account.last_four}</dd>
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
                                                    {(new Date(application.decided_at).toLocaleDateString())}
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
                        )}

                        {/* {activeTab === 'documents' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
                                {application.documents && application.documents.length > 0 ? (
                                    <div className="space-y-4">
                                        {application.documents.map((doc) => (
                                            <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div className="bg-gray-100 p-2 rounded">
                                                        <Download className="h-5 w-5 text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{doc.document_type}</p>
                                                        <p className="text-sm text-gray-500">{doc.file_name}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-sm text-gray-500">
                                                        {(new Date(doc.uploaded_at)).toLocaleDateString()}
                                                    </span>
                                                    <button className="text-blue-600 hover:text-blue-800">
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-blue-600 hover:text-blue-800">
                                                        <Download className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No documents uploaded for this application.
                                    </div>
                                )}
                            </div>
                        )} */}

                        {activeTab === 'offers' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Offers</h3>
                                {loanOffers.length > 0 ? (
                                    <div className="space-y-4">
                                        {loanOffers.map((offer) => (
                                            <div key={offer.id} className="border rounded-lg p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">
                                                            {formatCurrency(offer.principal)} loan
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            Due {(new Date(offer.repayment_date)).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${offer.offer_status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                        offer.offer_status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                            'bg-blue-100 text-blue-800'
                                                        }`}>
                                                        {offer.offer_status}
                                                    </span>
                                                </div>
                                                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-gray-500">Principal:</span>
                                                        <span className="ml-1 font-medium">{formatCurrency(offer.principal)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Fee:</span>
                                                        <span className="ml-1 font-medium">{formatCurrency(offer.fee_amount)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Interest:</span>
                                                        <span className="ml-1 font-medium">{offer.interest_rate}%</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Total Due:</span>
                                                        <span className="ml-1 font-medium">{formatCurrency(offer.total_due)}</span>
                                                    </div>
                                                </div>
                                                {offer.offer_status === 'offered' && (
                                                    <div className="mt-4 flex space-x-2">
                                                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                                                            Accept
                                                        </button>
                                                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                                                            Reject
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No loan offers available for this application.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}