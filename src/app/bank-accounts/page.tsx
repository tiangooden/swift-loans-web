'use client';

import BankAccountForm from './BankAccountForm';
import { useFetchBankAccounts } from './useFetchBankAccounts';
import { useSaveBankAccount } from './useSaveBankAccount';
import { CreditCard } from 'lucide-react';

const BankAccountsPage = () => {
  const { account, loading: fetchLoading, error: fetchError, fetchAccount } = useFetchBankAccounts();
  const { saveBankAccount, loading: saveLoading, error: saveError } = useSaveBankAccount(fetchAccount);

  if (fetchLoading) {
    return <div className="flex justify-center items-center h-screen">Loading bank account...</div>;
  }

  if (saveLoading) {
    return <div className="flex justify-center items-center h-screen">Saving bank account...</div>;
  }

  if (fetchError || saveError) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {fetchError || saveError}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Bank Account</h1>
        </div>
        <BankAccountForm account={account} onSave={saveBankAccount} />
      </div>
    </div>
  );
};

export default BankAccountsPage;