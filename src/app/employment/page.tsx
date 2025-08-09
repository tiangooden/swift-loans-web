'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EmploymentForm from './EmploymentForm';

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
                // Assuming you have a user ID available in the session or can derive it
                // For simplicity, let's assume we fetch by user's email for now
                const res = await fetch(`/api/employment/${session.user?.email}`);
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
            const res = await fetch(`/api/employment/${session.user.email}`, {
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
            alert('Employment details updated successfully!');
        } catch (err: any) {
            setError(err.message);
            alert(`Error updating employment details: ${err.message}`);
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
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Employment Details</h1>
                {employment && <EmploymentForm initialData={employment} onSave={handleSave} />}
            </div></div>
    );
}