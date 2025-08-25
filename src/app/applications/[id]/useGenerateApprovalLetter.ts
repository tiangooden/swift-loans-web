import { notifications } from '@/app/shared/notifications';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function useGenerateApprovalLetter() {
  return useMutation({
    mutationFn: async (applicationId: string) => {
      return axios.post(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/approval`, {
        "Name": "Tian",
        "OrderID": "1",
        "OrderDate": "today",
        "TotalAmount": "100",
        "Company": "bluesea"
      })
    },
    onSuccess: () => {
      notifications.success('Approval letter generated successfully!');
    },
    onError: (error) => {
      notifications.error(`Error generating approval letter: ${error.message}`);
    },
  });
}