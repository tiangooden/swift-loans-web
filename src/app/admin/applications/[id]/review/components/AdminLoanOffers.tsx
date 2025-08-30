'use client';

import { Download, Trash2 } from 'lucide-react';
import { getStatusColor, getStatusIcon } from '@/app/shared/status';
import formatDateString from '@/app/shared/date';
import { AdminLoanOffersProps } from '../types';
import formatCurrency from '@/app/shared/currency';
import { notifications } from '@/app/shared/notifications';

export default function AdminLoanOffers({
    applicationId,
    offers = [],
    deleteOffer,
    isDeleting,
    downloadSignedApproval,
    isDownloading,
}: AdminLoanOffersProps & {
    deleteOffer: (offerId: string) => Promise<void>;
    isDeleting: boolean;
    downloadSignedApproval: (id: any) => Promise<void>;
    isDownloading: boolean;
}) {

    const handleDeleteOffer = async (offerId: string) => {
        if (window.confirm('Are you sure you want to delete this offer?')) {
            await deleteOffer(offerId);
            notifications.success('Offer deleted successfully!');
        }
    };

    const handleSignedApprovalDownload = async (id: any) => {
        await downloadSignedApproval(id);
        notifications.success('File downloaded successfully!');
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Offers</h3>
            {offers.length > 0 ? (
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
                            {offers.map(({ id, principal, interest_rate, approval_file_key, term_in_days, status, created_at }: any) => (
                                <tr key={id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(principal)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interest_rate}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{term_in_days}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                                            {getStatusIcon(status)}&nbsp;{status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateString(created_at)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleDeleteOffer(id)}
                                                className="text-red-400 hover:text-red-900 disabled:opacity-50"
                                                title="Delete Offer"
                                                disabled={isDeleting}
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleSignedApprovalDownload(approval_file_key)}
                                                className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                                                title="Download Signed Approval"
                                                disabled={isDownloading}
                                            >
                                                <Download />
                                            </button>
                                        </div>
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
    );
}