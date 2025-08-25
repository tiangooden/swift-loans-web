import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { notifications } from '@/app/shared/notifications';
import { useFetchApplicationsKey } from '../useFetchApplications';

export function useWithdrawApplication() {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: async (applicationId: string) => {
            return axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${applicationId}/withdraw`).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [useFetchApplicationsKey] });
            notifications.success('Application withdrawn successfully!');
        },
        onError: (err: any) => {
            notifications.error(`Error withdrawing application: ${err.message}`);
        },
    });

    return { mutateAsync, isPending, error };
}