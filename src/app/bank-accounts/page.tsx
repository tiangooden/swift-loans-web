'use client';

import BankAccountForm from './BankAccountForm';
import { useFetchBankAccounts } from './useFetchBankAccounts';
import { useSaveBankAccount } from './useSaveBankAccount';

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
          <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
          </svg>
          <h1 className="text-3xl font-bold text-gray-800">Bank Account</h1>
        </div>
        <BankAccountForm account={account} onSave={saveBankAccount} />
      </div>
    </div>
  );
};

export default BankAccountsPage;