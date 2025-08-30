'use client';

import LoadingOverlayWrapper from 'react-loading-overlay-ts';
import { notifications } from '../shared/notifications';
import BankAccountForm from './BankAccountForm';
import { BankAccount } from './types';
import { useFetchBankAccounts } from './useFetchBankAccounts';
import { useSaveBankAccount } from './useSaveBankAccount';
import { CreditCard } from 'lucide-react';

const BankAccountsPage = () => {
  const { data: account, isFetching } = useFetchBankAccounts();
  const { mutateAsync, isPending } = useSaveBankAccount();

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
    <LoadingOverlayWrapper active={isFetching} spinner text='Loading your bank accounts...'>
      <LoadingOverlayWrapper active={isPending} spinner text='Saving your bank account...'>
        <div className="min-h-screen bg-gray-100 p-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">Bank Account</h1>
            </div>
            <BankAccountForm account={account} onSave={handleSave} />
          </div>
        </div>
      </LoadingOverlayWrapper>
    </LoadingOverlayWrapper>
  );
};

export default BankAccountsPage;