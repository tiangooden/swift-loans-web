import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchFileKey } from './useFetchDocuments';
import { HttpError } from '../shared/http-errors';

export const useFileUpload = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation<any, Error, FileList>({
    mutationFn: async (files: FileList) => {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/files`, formData);
        queryClient.invalidateQueries({ queryKey: [useFetchFileKey] });
        return res.data;
      } catch (e: any) {
        throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
      }
    },
  });

  return { mutateAsync, isPending, error };
};