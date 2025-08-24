import { notifications } from '@/app/shared/notifications';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchApplicationReviewsKey } from './useFetchApplicationReview';

export function useRejectApplicationReview() {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation<boolean, Error, { id: string; decision_reason: string }>({
        mutationFn: async ({ id, decision_reason }) => {
            return axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}/reject`, { decision_reason }).then(res => res.data);
        },
        onSuccess: (_, applicationId) => {
            queryClient.invalidateQueries({ queryKey: [useFetchApplicationReviewsKey, applicationId] });
            notifications.success('Application rejected successfully!');
        },
        onError: (err) => {
            notifications.error(`Error rejecting application: ${err.message}`);
        },
    });

    return { mutateAsync, isPending, error };
}