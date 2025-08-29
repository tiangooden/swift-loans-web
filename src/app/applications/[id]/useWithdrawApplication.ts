import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useFetchApplicationsKey } from '../useFetchApplications';
import { HttpError } from '@/app/shared/http-errors';

export function useWithdrawApplication() {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: async (applicationId: string) => {
            try {
                const res = await axios.patch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${applicationId}/withdraw`);
                queryClient.invalidateQueries({ queryKey: [useFetchApplicationsKey] });
                return res.data;
            } catch (e: any) {
                throw new HttpError(e.response?.status || 500, e.response?.data);
            }
        },
    });

    return { mutateAsync, isPending, error };
}