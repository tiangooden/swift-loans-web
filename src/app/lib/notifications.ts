import toast from 'react-hot-toast';

export const notifications = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast(message),
  loading: (message: string) => toast.loading(message),
  dismiss: (toastId?: string) => toast.dismiss(toastId),
};