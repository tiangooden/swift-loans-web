import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchFileKey } from './useFetchDocuments';
import { HttpError } from '../lib/httpErrors';

export const useDeleteFile = () => {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation<any, Error, string>({
        mutationFn: async (key: string) => {
            try {
                const res = await axios.delete(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/files/${key}`);
                queryClient.invalidateQueries({ queryKey: [useFetchFileKey] });
                return res.data;
            } catch (e: any) {
                throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
            }
        },
    });

    return { mutateAsync, isPending, error };
};