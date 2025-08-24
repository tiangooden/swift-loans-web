import axios from 'axios';
import { notifications } from '../shared/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchFileKey } from './useFetchDocuments';

export const useFileUpload = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error, isSuccess } = useMutation<any, Error, FileList>({
    mutationFn: async (files: FileList) => {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
      return axios.post(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/files`, formData).then(res => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [useFetchFileKey] });
      notifications.success('Files uploaded successfully');
    },
    onError: (err) => {
      notifications.error(`Failed to upload files: ${err.message}`);
    },
  });

  return { mutateAsync, isPending, error, isSuccess };
};