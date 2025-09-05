import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BankAccount } from './types';
import axios from 'axios';
import { useFetchBankAccountsKey } from './useFetchBankAccounts';
import { HttpError } from '../lib/http-errors';

export const useSaveBankAccount = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation<any, Error, BankAccount>({
    mutationFn: async (bankAccount: BankAccount) => {
      try {
        const url = bankAccount.id ?
          `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/bank-accounts/${bankAccount.id}` :
          `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/bank-accounts`;
        const res = bankAccount.id ?
          await axios.put(url, bankAccount) :
          await axios.post(url, bankAccount);
        queryClient.invalidateQueries({ queryKey: [useFetchBankAccountsKey] });
        return res.data;
      } catch (e: any) {
        throw new HttpError(e.response?.status || 500, e.message, e.response?.data);
      }
    },
  });

  return { mutateAsync, isPending, error };
};