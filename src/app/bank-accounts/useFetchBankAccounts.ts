import { useState, useEffect } from 'react';
import { BankAccount } from './types';
import axios from 'axios';

export const useFetchBankAccounts = () => {
  const [account, setAccount] = useState<BankAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    try {
      const data = (await axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/bank-accounts`)).data;
      if (data.length > 0) {
        setAccount(data[0]);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { account, loading, error, fetchAccount };
};