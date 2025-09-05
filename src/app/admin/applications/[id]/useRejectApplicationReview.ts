import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchApplicationReviewsKey } from './useFetchApplicationReview';
import { HttpError } from '@/app/lib/http-errors';

export function useRejectApplicationReview() {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation<boolean, Error, { id: string; decision_reason: string }>({
        mutationFn: async ({ id, decision_reason }) => {
            try {
                const res = await axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}/reject`, { decision_reason });
                queryClient.invalidateQueries({ queryKey: [useFetchApplicationReviewsKey] });
                return res.data;
            } catch (e: any) {
                throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
            }
        },
    });

    return { mutateAsync, isPending, error };
}