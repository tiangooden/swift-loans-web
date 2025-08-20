import { useState, useEffect } from 'react';
import { BankAccount } from './types';

export const useFetchBankAccounts = () => {
  const [account, setAccount] = useState<BankAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccount = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/bank-accounts`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length > 0) {
        setAccount(data[0]);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return { account, loading, error, fetchAccount };
};