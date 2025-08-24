import { notifications } from '../shared/notifications';
import { Employment } from './types';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchEmploymentKey } from './useFetchEmployment';

export function useSaveEmployment() {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation<any, Error, Employment>({
        mutationFn: async (updatedEmployment: Employment) => {
            return axios.put(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/employment`, updatedEmployment).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [useFetchEmploymentKey] });
            notifications.success('Employment updated successfully!');
        },
        onError: (err) => {
            notifications.error(`Error updating employment details: ${err.message}`);
        },
    });

    return { mutateAsync, isPending, error };
}