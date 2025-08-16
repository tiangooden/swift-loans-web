'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EmploymentForm from './EmploymentForm';
import { notifications } from '../shared/notifications';

interface EmploymentDetails {
    employer_name: string;
    job_title: string;
    employment_type: string;
    monthly_income: number;
    payday_day: number;
}

export default function EmploymentPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [employment, setEmployment] = useState<EmploymentDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'loading') return;
        if (!session) {
            router.push('/api/auth/signin');
            return;
        }

        const fetchEmployment = async () => {
            try {
                const res = await fetch(`/api/employment`);
                if (!res.ok) {
                    if (res.status === 404) {
                        setEmployment({ employer_name: '', job_title: '', employment_type: '', monthly_income: 0, payday_day: 1 });
                    } else {
                        throw new Error(`Failed to fetch employment details: ${res.statusText}`);
                    }
                }
                const data = await res.json();
                setEmployment({
                    employer_name: data.employer_name || '',
                    job_title: data.job_title || '',
                    employment_type: data.employment_type || '',
                    monthly_income: data.monthly_income ? parseFloat(data.monthly_income) : 0,
                    payday_day: data.payday_day || 1,
                });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployment();
    }, [session, status, router]);

    const handleSave = async (updatedEmployment: EmploymentDetails) => {
        if (!session?.user?.email) return;
        try {
            const res = await fetch(`/api/employment`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEmployment),
            });
            if (!res.ok) {
                throw new Error(`Failed to update employment details: ${res.statusText}`);
            }
            setEmployment(updatedEmployment);
            notifications.success('Employment details updated successfully!');
        } catch (err: any) {
            setError(err.message);
            notifications.error(`Error updating employment details`);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading employment details...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
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
                {employment && <EmploymentForm initialData={employment} onSave={handleSave} />}
            </div></div>
    );
}