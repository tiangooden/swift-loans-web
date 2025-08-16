'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import BankAccountForm, { BankAccount } from './BankAccountForm';
import { notifications } from '../shared/notifications';
import { useRouter } from 'next/navigation';

const BankAccountsPage = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<BankAccount | null>(null);
  const router = useRouter();

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

  const handleSaveBankAccount = async (bankAccount: BankAccount) => {
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
      router.refresh(); // Refresh data after save
    } catch (e: any) {
      notifications.error(`Failed to ${bankAccount.id ? 'update' : 'add'} bank account: ` + e.message);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading bank accounts...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  if (!session?.user?.email) {
    return <div className="flex justify-center items-center h-screen">Please log in to manage bank accounts.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
          </svg>
          <h1 className="text-3xl font-bold text-gray-800">Bank Accounts</h1>
        </div>
        <BankAccountForm account={account} onSave={handleSaveBankAccount} />
      </div>
    </div>
  );
};

export default BankAccountsPage;