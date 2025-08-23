'use client';

import EmploymentForm from './EmploymentForm';
import { Briefcase } from 'lucide-react';
import { useFetchEmployment } from './useFetchEmployment';
import { useSaveEmployment } from './useSaveEmployment';

export default function EmploymentPage() {
    const { employment, loading, error, fetchEmployment } = useFetchEmployment();
    const { saveEmployment, loading: saving, error: saveError } = useSaveEmployment(fetchEmployment);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading employment details...</div>;
    }

    if (saving) {
        return <div className="flex justify-center items-center h-screen">Saving employment details...</div>;
    }

    if (error || saveError) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error || saveError}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                    <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
                    <h1 className="text-3xl font-bold text-gray-800">Employment Details</h1>
                </div>
                <EmploymentForm data={employment} onSave={saveEmployment} />
            </div>
        </div>
    );
}