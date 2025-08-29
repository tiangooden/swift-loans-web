'use client';

import { notifications } from '../shared/notifications';
import BankAccountForm from './BankAccountForm';
import { BankAccount } from './types';
import { useFetchBankAccounts } from './useFetchBankAccounts';
import { useSaveBankAccount } from './useSaveBankAccount';
import { CreditCard } from 'lucide-react';

const BankAccountsPage = () => {
  const { data: account, isFetching: fetchLoading, error: fetchError } = useFetchBankAccounts();
  const { mutateAsync, isPending: saveLoading, error: saveError } = useSaveBankAccount();

  if (fetchLoading) {
    return <div className="flex justify-center items-center h-screen">Loading bank account...</div>;
  }

  async function handleSave(bankAccount: BankAccount): Promise<void> {
    try {
      const res = mutateAsync(bankAccount);
      notifications.success(`Bank account ${bankAccount.id ? 'updated' : 'added'} successfully!`);
      return res;
    } catch (err) {
      notifications.error(`Failed to ${bankAccount.id ? 'update' : 'save'} bank account: ${err}`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Bank Account</h1>
        </div>
        <BankAccountForm account={account} onSave={handleSave} />
      </div>
    </div>
  );
};

export default BankAccountsPage;