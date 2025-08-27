import { notifications } from '@/app/shared/notifications';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { openLinkInNewWindow } from '@/app/shared/utils';

export function useDownloadSignedApproval() {
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: async (key: string) => {
            return await axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/files/${key}`);
        },
        onSuccess: (data: any) => {
            openLinkInNewWindow(data.data.signed_url);
            notifications.success('File downloaded successfully!');
        },
        onError: (err) => {
            notifications.error(`Error downloading file: ${err.message}`);
        },
    });

    return { mutateAsync, isPending, error };
}