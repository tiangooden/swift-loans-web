'use client';

import EmploymentForm from './EmploymentForm';
import { Briefcase } from 'lucide-react';
import { useFetchEmployment } from './useFetchEmployment';
import { useSaveEmployment } from './useSaveEmployment';

export default function EmploymentPage() {
    const { data, isFetching, error: fetchError } = useFetchEmployment();
    const { mutateAsync, isPending, error: saveError } = useSaveEmployment();

    if (isFetching) {
        return <div className="flex justify-center items-center h-screen">Loading employment details...</div>;
    }

    if (isPending) {
        return <div className="flex justify-center items-center h-screen">Saving employment details...</div>;
    }

    if (fetchError || saveError) {
        return <div className="flex justify-center items-center h-screen text-red-500">
            Error: {fetchError?.message || saveError?.message}
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                    <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
                    <h1 className="text-3xl font-bold text-gray-800">Employment Details</h1>
                </div>
                <EmploymentForm data={data} onSave={mutateAsync} />
            </div>
        </div>
    );
}