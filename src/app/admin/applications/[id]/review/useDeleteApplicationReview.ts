import { notifications } from '@/app/shared/notifications';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchApplicationReviewsKey } from './useFetchApplicationReview';

export function useDeleteApplicationReview() {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation<boolean, Error, string>({
        mutationFn: async (applicationId: string) => {
            return axios.delete(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${applicationId}`).then(res => res.data);
        },
        onSuccess: (_, applicationId) => {
            queryClient.invalidateQueries({ queryKey: [useFetchApplicationReviewsKey, applicationId] });
            notifications.success('Application deleted successfully!');
        },
        onError: (err) => {
            notifications.error(`Error deleting application: ${err.message}`);
        },
    });

    return { mutateAsync, isPending, error };
}