import { Employment } from './types';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchEmploymentKey } from './useFetchEmployment';
import { HttpError } from '../lib/httpErrors';

export function useSaveEmployment() {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation<any, Error, Employment>({
        mutationFn: async (updatedEmployment: Employment) => {
            try {
                const url = updatedEmployment.id
                    ? `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/employment/${updatedEmployment.id}`
                    : `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/employment`;
                const res = updatedEmployment.id
                    ? await axios.put(url, updatedEmployment)
                    : await axios.post(url, updatedEmployment);
                queryClient.invalidateQueries({ queryKey: [useFetchEmploymentKey] });
                return res.data;
            } catch (e: any) {
                throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
            }
        },
    });

    return { mutateAsync, isPending, error };
}