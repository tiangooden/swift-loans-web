import { notifications } from '@/app/shared/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useUploadApprovalLetter() {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: async ({ offerId, key }: { offerId: string, key: { key: string } }) => {
            return await axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/offers/${offerId}/approval/upload`, key);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['application'] });
            notifications.success('Approval letter uploaded successfully!');
        },
        onError: (error) => {
            notifications.error(`Error uploading approval letter: ${error.message}`);
        },
    });
    return { mutateAsync, isPending, error };
}