'use client';

import { useFetchUser } from './useFetchUser';
import { useUpdateUser } from './useUpdateUser';
import UserForm from './UserForm';
import { notifications } from '../shared/notifications';
import { User } from 'lucide-react';
import { User as UserType } from './types';
import { useEffect } from 'react';
import LoadingOverlayWrapper from 'react-loading-overlay-ts';
import { useState } from 'react';
import { processValidationErrors } from '../shared/utils/createMessageMap';
import { updateUserSchema } from '../api/users/schema';
import { validateSchema } from '../shared/validation';
import { handleChange as handleChangeUtil } from '../shared/util/handleChange';

export default function UserProfilePage() {
    const { data, isFetching } = useFetchUser();
    const [errors, setErrors] = useState<Map<string, string>>(new Map());
    const { mutateAsync, isPending } = useUpdateUser();
    const [formData, setFormData] = useState<UserType>({
        id: '',
        identity: '',
        alias: '',
        email: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        dob: null,
        phone_number: '',
        trn: '',
        street_address: '',
        city: '',
        country: '',
        status: '',
    });
    const handleChange = handleChangeUtil(setFormData)

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    async function handleSave(): Promise<void> {
        try {
            validateSchema(formData, updateUserSchema);
        } catch (error: any) {
            return setErrors(processValidationErrors(error.errors));
        }
        try {
            await mutateAsync(formData);
            notifications.success('Profile updated successfully!');
        } catch (e: any) {
            const { errors: er, statusMessage } = e;
            setErrors(processValidationErrors(er));
            notifications.error(`An error occurred: ${statusMessage}`);
        }
    }

    return (
        <LoadingOverlayWrapper active={isFetching} spinner text='Loading your profile...'>
            <LoadingOverlayWrapper active={isPending} spinner text='Updating your profile...'>
                <div className="min-h-screen bg-gray-100 p-4">
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                        <div className="flex items-center mb-6">
                            <User className="w-8 h-8 text-blue-600 mr-3" />
                            <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
                        </div>
                        <UserForm
                            data={data}
                            onSave={handleSave}
                            setErrors={setErrors}
                            errors={errors}
                            formData={formData}
                            handleChange={handleChange}
                        />
                    </div>
                </div>
            </LoadingOverlayWrapper>
        </LoadingOverlayWrapper>
    );
};