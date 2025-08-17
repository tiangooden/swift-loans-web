'use client';

import EmploymentForm from './EmploymentForm';
import { useEmploymentDetails, useSaveEmploymentDetails } from './hooks';

export default function EmploymentPage() {
    const { employment, loading, error, fetchEmployment } = useEmploymentDetails();
    const { saveEmployment, loading: saving, error: saveError } = useSaveEmploymentDetails(fetchEmployment);

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
                    <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-2a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <h1 className="text-3xl font-bold text-gray-800">Employment Details</h1>
                </div>
                <EmploymentForm data={employment} onSave={saveEmployment} />
            </div>
        </div>
    );
}