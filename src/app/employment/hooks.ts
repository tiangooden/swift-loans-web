import { useState, useEffect } from 'react';
import { notifications } from '../shared/notifications';

export interface EmploymentDetails {
    employer_name: string;
    job_title: string;
    monthly_income: number;
    payday_day: number;
}

export function useEmploymentDetails() {
    const [employment, setEmployment] = useState<EmploymentDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEmployment();
    }, []);

    const fetchEmployment = async () => {
        try {
            const res = await fetch(`/api/employment`);
            if (!res.ok) {
                throw new Error(`Failed to fetch employment details: ${res.statusText}`);
            }
            const data = await res.json();
            setEmployment(data);
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { employment, loading, error, fetchEmployment };
}

export function useSaveEmploymentDetails(onSuccess?: () => void) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const saveEmployment = async (updatedEmployment: EmploymentDetails) => {
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
            notifications.success('Employment updated successfully!');
            if (onSuccess) {
                onSuccess();
            }
            return true;
        } catch (err: any) {
            notifications.error(`Error updating employment details`);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };
    return { saveEmployment, loading, error };
}