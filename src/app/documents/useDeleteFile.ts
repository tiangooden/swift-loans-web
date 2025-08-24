import axios from 'axios';
import { notifications } from '../shared/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchFileKey } from './useFetchDocuments';

export const useDeleteFile = () => {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation<any, Error, string>({
        mutationFn: async (key: string) => {
            return axios.delete(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/files/${key}`).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [useFetchFileKey] });
            notifications.success('File deleted successfully');
        },
        onError: (err) => {
            notifications.error(`Failed to delete file: ${err.message}`);
        },
    });

    return { mutateAsync, isPending, error };
};