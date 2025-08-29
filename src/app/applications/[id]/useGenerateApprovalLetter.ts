import { HttpError } from '@/app/shared/http-errors';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function useGenerateApprovalLetter() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async (offerId: string) => {
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/offers/${offerId}/approval`, {}, {
          responseType: 'blob',
        });
        return res;
      } catch (e: any) {
        throw new HttpError(e.response?.status || 500, e.response?.data);
      }
    },
  });

  return { mutateAsync, isPending, error };
}