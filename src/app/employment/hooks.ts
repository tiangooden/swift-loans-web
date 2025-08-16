import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { notifications } from '../shared/notifications';

interface EmploymentDetails {
    employer_name: string;
    job_title: string;
    employment_type: string;
    monthly_income: number;
    payday_day: number;
}

export function useEmploymentDetails() {
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

    return { employment, loading, error };
}

export function useSaveEmploymentDetails() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const saveEmployment = async (updatedEmployment: EmploymentDetails) => {
        if (!session?.user?.email) {
            setError('User session not found.');
            return false;
        }
        setLoading(true);
        setError(null);
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
            notifications.success('Employment details updated successfully!');
            return true;
        } catch (err: any) {
            setError(err.message);
            notifications.error(`Error updating employment details`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { saveEmployment, loading, error };
}