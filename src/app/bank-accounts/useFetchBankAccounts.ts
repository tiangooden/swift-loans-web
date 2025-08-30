import { useQuery } from '@tanstack/react-query';
import { BankAccount } from './types';
import axios from 'axios';

export const useFetchBankAccounts = () => {
  const { data, isFetching, error } = useQuery<BankAccount | null>({
    queryKey: [useFetchBankAccountsKey],
    queryFn: async () => {
      return axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/bank-accounts`).then(res => res.data);
    },
  });

  return { data, isFetching, error };
};

export const useFetchBankAccountsKey = 'bankAccount';