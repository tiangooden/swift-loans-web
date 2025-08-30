'use client';

import { Check, Download, X } from 'lucide-react';
import FileUploadButton from '@/app/shared/component/FileUploadButton';
import { getStatusColor, getStatusIcon } from '@/app/shared/status';
import formatDateString from '@/app/shared/date';
import { useAcceptOffer } from '../useAcceptOffer';
import { useGenerateApprovalLetter } from '../useGenerateApprovalLetter';
import { useRejectOffer } from '../useRejectOffer';
import formatCurrency from '@/app/shared/currency';
import { useUploadApprovalLetter } from '../useUploadApprovalLetter';
import { useFileUpload } from '@/app/documents/useFileUpload';
import { notifications } from '@/app/shared/notifications';
import downloadFileInBrowser from '@/app/shared/download';

export default function LoanOffers({ offers }: any) {
    const { mutateAsync: acceptOffer, isPending: accepting } = useAcceptOffer();
    const { mutateAsync: rejectOffer, isPending: rejecting } = useRejectOffer();
    const { mutateAsync: generateApprovalLetter, isPending: isGeneratingApprovalLetter } = useGenerateApprovalLetter();
    const { mutateAsync: uploadApprovalLetter, isPending: isUploadingApprovalLetterr } = useUploadApprovalLetter();
    const { mutateAsync: uploadFiles, isPending: isUploadingFiles, isSuccess: isSuccessUploadingFiles } = useFileUpload();

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

    return (
        <div className="lg:col-span-3 bg-white rounded-lg shadow">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Loan Offers</h2>
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
                                {offers.map(({ id, principal, interest_rate, term_in_days, status, created_at }: any) => (
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
                                                    onClick={() => handleAcceptOffer(id)}
                                                    className="text-green-600 hover:text-green-900"
                                                    title="Accept Offer"
                                                >
                                                    <Check className="h-5 w-5" />
                                                </button>

                                                <button
                                                    onClick={() => handleRejectOffer(id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Reject Offer"
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                                <button
                                                    type='button'
                                                    onClick={() => handleDownloanApprovalLetter(id)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Download Approval Letter"
                                                    disabled={isGeneratingApprovalLetter}
                                                >
                                                    <Download className="h-5 w-5" />
                                                </button>
                                                <FileUploadButton
                                                    onFileUpload={(file) => handleUploadApprovalLetter(id, file)}
                                                    title="Upload Approval Letter"
                                                    className="text-blue-600 hover:text-blue-900"
                                                />
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
        </div>
    );
}