'use client';

import LoadingOverlayWrapper from 'react-loading-overlay-ts';
import { notifications } from '../shared/notifications';
import BankAccountForm from './BankAccountForm';
import { BankAccount } from './types';
import { useFetchBankAccounts } from './useFetchBankAccounts';
import { useSaveBankAccount } from './useSaveBankAccount';
import { CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { processValidationErrors } from '../shared/utils/createMessageMap';
import { validateSchema } from '../shared/validation';
import { bankAccountSchema } from './schema';

const BankAccountsPage = () => {
  const { data: account, isFetching } = useFetchBankAccounts();
  const { mutateAsync, isPending } = useSaveBankAccount();
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  const [formData, setFormData] = useState<BankAccount>({
    bank_name: '',
    branch_name: '',
    account_name: '',
    account_number: '',
    account_type: '',
  });

  useEffect(() => {
    if (account) {
      setFormData(account);
    }
  }, [account]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  async function handleSave(): Promise<void> {
    try {
      validateSchema(formData, bankAccountSchema);
    } catch (error: any) {
      return setErrors(processValidationErrors(error.errors));
    }
    try {
      const res = await mutateAsync(formData);
      notifications.success(`Bank account ${formData.id ? 'updated' : 'added'} successfully!`);
      setErrors(new Map());
      return res;
    } catch (err: any) {
      notifications.error(`Failed to ${formData.id ? 'update' : 'save'} bank account: ${err}`);
      setErrors(processValidationErrors(err));
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
            <BankAccountForm
              account={account}
              onSave={handleSave}
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          </div>
        </div>
      </LoadingOverlayWrapper>
    </LoadingOverlayWrapper>
  );
};

export default BankAccountsPage;