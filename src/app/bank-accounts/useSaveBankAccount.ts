import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@/app/shared/notifications';
import { BankAccount } from './types';
import axios from 'axios';
import { useFetchBankAccountsKey } from './useFetchBankAccounts';

export const useSaveBankAccount = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation<any, Error, BankAccount>({
    mutationFn: async (bankAccount: BankAccount) => {
      const url = bankAccount.id ?
        `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/bank-accounts/${bankAccount.id}` :
        `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/bank-accounts`;

      if (bankAccount.id) {
        return axios.put(url, bankAccount).then(res => res.data);
      } else {
        return axios.post(url, bankAccount).then(res => res.data);
      }
    },
    onSuccess: (_, bankAccount) => {
      queryClient.invalidateQueries({ queryKey: [useFetchBankAccountsKey] });
      notifications.success(`Bank account ${bankAccount.id ? 'updated' : 'added'} successfully!`);
    },
    onError: (e: any, bankAccount) => {
      notifications.error(`Failed to ${bankAccount.id ? 'update' : 'add'} bank account: ` + e.message);
    },
  });

  return { mutateAsync, isPending, error };
};