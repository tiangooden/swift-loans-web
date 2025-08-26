import { notifications } from '@/app/shared/notifications';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchApplicationReviewsKey } from './useFetchApplicationReview';

export function useApproveApplicationReview() {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation<boolean, Error, string>({
        mutationFn: async (applicationId: string) => {
            return axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${applicationId}/approve`).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [useFetchApplicationReviewsKey] });
            notifications.success('Application approved successfully!');
        },
        onError: (err) => {
            notifications.error(`Error approving application: ${err.message}`);
        },
    });

    return { mutateAsync, isPending, error };
}