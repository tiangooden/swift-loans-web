import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { notifications } from '@/app/shared/notifications';
import { BankAccount } from './BankAccountForm';

export const useFetchBankAccounts = () => {
  const { data: session, status } = useSession();
  const [account, setAccount] = useState<BankAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const response = await fetch(`/api/bank-accounts`);
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
      } else if (status === 'unauthenticated') {
        setLoading(false);
        setError('You must be logged in to view this page.');
      }
    };
    fetchAccount();
  }, [session, status]);

  return { account, loading, error };
};

export const useSaveBankAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveBankAccount = useCallback(async (bankAccount: BankAccount) => {
    setLoading(true);
    setError(null);
    const method = bankAccount.id ? 'PUT' : 'POST';
    const url = bankAccount.id ? `/api/bank-accounts/${bankAccount.id}` : `/api/bank-accounts`;
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bankAccount),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      notifications.success(`Bank account ${bankAccount.id ? 'updated' : 'added'} successfully!`);
    } catch (e: any) {
      notifications.error(`Failed to ${bankAccount.id ? 'update' : 'add'} bank account: ` + e.message);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { saveBankAccount, loading, error };
};