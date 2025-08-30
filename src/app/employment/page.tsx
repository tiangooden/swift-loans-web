'use client';

import EmploymentForm from './EmploymentForm';
import { Briefcase } from 'lucide-react';
import { useFetchEmployment } from './useFetchEmployment';
import { useSaveEmployment } from './useSaveEmployment';
import { Employment } from './types';
import { notifications } from '../shared/notifications';
import LoadingOverlayWrapper from 'react-loading-overlay-ts';
import { useState, useEffect } from 'react';
import { processValidationErrors } from '../shared/utils/createMessageMap';
import { validateSchema } from '../shared/validation';
import { employmentsSchema } from '../api/employment/schema';

export default function EmploymentPage() {
    const { data, isFetching } = useFetchEmployment();
    const { mutateAsync, isPending } = useSaveEmployment();
    const [errors, setErrors] = useState<Map<string, string>>(new Map());
    const [formData, setFormData] = useState<Employment>({
        employer_name: '',
        employer_phone_number: '',
        job_title: '',
        date_of_employment: undefined,
        gross_salary: 0,
        payday_day: 0,
        pay_cycle: '',
        total_expenses_per_cycle: 0,
    });

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const typedValue = type === "number" ? Number(value) : value;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : typedValue,
        }));
    }

    async function handleSave(employment: Employment): Promise<void> {
        try {
            validateSchema(employment, employmentsSchema);
        } catch (error: any) {
            return setErrors(processValidationErrors(error.errors));
        }
        try {
            await mutateAsync(employment);
            notifications.success('Employment updated successfully!');
            setErrors(new Map());
        } catch (err: any) {
            notifications.error(`Failed to ${employment.id ? 'update' : 'save'} employment: ${err}`);
            setErrors(processValidationErrors(err));
        }
    }

    return (
        <LoadingOverlayWrapper active={isFetching} spinner text='Loading your employment...'>
            <LoadingOverlayWrapper active={isPending} spinner text='Updating your employment...'>
                <div className="min-h-screen bg-gray-100 p-4">
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                        <div className="flex items-center mb-6">
                            <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
                            <h1 className="text-3xl font-bold text-gray-800">Employment Details</h1>
                        </div>
                        <EmploymentForm
                            data={data}
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
}