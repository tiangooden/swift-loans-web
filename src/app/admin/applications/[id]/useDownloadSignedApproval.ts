import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { openLinkInNewWindow } from '@/app/lib/utils';
import { HttpError } from '@/app/lib/http-errors';

export function useDownloadSignedApproval() {
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: async (key: string) => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/files/${key}`);
                openLinkInNewWindow(res.data.signed_url);
            } catch (e: any) {
                throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
            }
        },
    });

    return { mutateAsync, isPending, error };
}