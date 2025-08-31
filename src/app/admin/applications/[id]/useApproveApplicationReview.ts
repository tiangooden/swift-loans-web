import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchApplicationReviewsKey } from './useFetchApplicationReview';
import { HttpError } from '@/app/shared/http-errors';

export function useApproveApplicationReview() {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation<boolean, Error, string>({
        mutationFn: async (applicationId: string) => {
            try {
                const res = await axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${applicationId}/approve`);
                queryClient.invalidateQueries({ queryKey: [useFetchApplicationReviewsKey] });
                return res.data;
            } catch (e: any) {
                throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
            }
        },
    });

    return { mutateAsync, isPending, error };
}