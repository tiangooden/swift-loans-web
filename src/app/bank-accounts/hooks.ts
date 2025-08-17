import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { notifications } from '@/app/shared/notifications';

export interface BankAccount {
  id?: number;
  user_id?: number | null;
  bank_name: string | null;
  branch_name: string | null;
  account_name: string | null;
  account_number: string | null;
  account_type: string | null;
}

export const useFetchBankAccounts = () => {
  const [account, setAccount] = useState<BankAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccount = async () => {
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
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return { account, loading, error, fetchAccount };
};

export const useSaveBankAccount = (onSuccess?: () => void) => {
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
      if (onSuccess) {
        onSuccess();
      }
    } catch (e: any) {
      notifications.error(`Failed to ${bankAccount.id ? 'update' : 'add'} bank account: ` + e.message);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { saveBankAccount, loading, error };
};