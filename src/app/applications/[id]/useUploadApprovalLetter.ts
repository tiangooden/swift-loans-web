import { HttpError } from '@/app/lib/http-errors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useUploadApprovalLetter() {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: async ({ offerId, key }: { offerId: string, key: { key: string } }) => {
            try {
                const res = await axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/offers/${offerId}/approval/upload`, key);
                queryClient.invalidateQueries({ queryKey: ['application'] });
                return res;
            } catch (e: any) {
                throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
            }
        },
    });
    return { mutateAsync, isPending, error };
}