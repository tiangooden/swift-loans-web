import { notifications } from '@/app/shared/notifications';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchApplicationReviewsKey } from './useFetchApplicationReview';

export const useDeleteOffer = () => {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation<boolean, Error, { applicationId: string, offerId: string }>({
        mutationFn: async ({ applicationId, offerId }) => {
            return axios.delete(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/offers/${offerId}`).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [useFetchApplicationReviewsKey] });
            notifications.success('Offer deleted successfully!');
        },
        onError: (err) => {
            notifications.error(err.message || 'Error deleting offer');
        },
    });

    return { mutateAsync, isPending, error };
};