import { useState, useCallback } from 'react';
import { notifications } from '@/app/shared/notifications';
import { BankAccount } from './types';

export const useSaveBankAccount = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveBankAccount = useCallback(async (bankAccount: BankAccount) => {
    setLoading(true);
    setError(null);
    const method = bankAccount.id ? 'PUT' : 'POST';
    const url = bankAccount.id ? `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/bank-accounts/${bankAccount.id}` : `${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/bank-accounts`;
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