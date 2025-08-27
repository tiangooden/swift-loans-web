import downloadFileInBrowser from '@/app/shared/download';
import { notifications } from '@/app/shared/notifications';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function useGenerateApprovalLetter() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (offerId: string) => {
      return await axios.post(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/offers/${offerId}/approval`, {}, {
        responseType: 'blob',
      });
    },
    onSuccess: (data: any) => {
      downloadFileInBrowser('approval.pdf', data.data);
      notifications.success('Approval letter generated successfully!');
    },
    onError: (error) => {
      notifications.error(`Error generating approval letter: ${error.message}`);
    },
  });

  return { mutateAsync, isPending, error };
}