'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import BankAccountForm from './BankAccountForm';

interface BankAccount {
  id: number;
  user_id: number | null;
  bank_name: string | null;
  account_number: string | null;
  account_type: string | null;
  is_primary: boolean | null;
}

const BankAccountsPage = () => {
  const { data: session, status } = useSession();
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchBankAccounts = async () => {
    if (status === 'authenticated' && session?.user?.email) {
      try {
        const response = await fetch(`/api/bank-accounts`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBankAccounts(data);
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

  useEffect(() => {
    fetchBankAccounts();
  }, [session, status]);

  const handleAddAccount = () => {
    setEditingAccount(null);
    setShowForm(true);
  };

  const handleEditAccount = (account: BankAccount) => {
    setEditingAccount(account);
    setShowForm(true);
  };

  const handleDeleteAccount = async (id: number) => {
    if (confirm('Are you sure you want to delete this bank account?')) {
      try {
        const response = await fetch(`/api/bank-accounts/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setBankAccounts(bankAccounts.filter((account) => account.id !== id));
      } catch (e: any) {
        alert(`Failed to delete account: ${e.message}`);
      }
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingAccount(null);
    fetchBankAccounts(); // Refresh the list
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

        <button
          onClick={handleAddAccount}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Bank Account
        </button>

        {showForm && (
          <BankAccountForm
            account={editingAccount}
            onClose={() => setShowForm(false)}
            onSubmitSuccess={handleFormSubmit}
          />
        )}

        {bankAccounts.length === 0 && !showForm ? (
          <p>No bank accounts found. Add one to get started!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Bank Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Account Number</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Account Type</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Primary</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bankAccounts.map((account) => (
                  <tr key={account.id}>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{account.bank_name}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{account.account_number}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{account.account_type}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{account.is_primary ? 'Yes' : 'No'}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm">
                      <button
                        onClick={() => handleEditAccount(account)}
                        className="text-blue-600 hover:text-blue-900 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAccount(account.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankAccountsPage;