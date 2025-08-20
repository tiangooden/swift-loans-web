import { useState, useEffect } from 'react';
import { Employment } from './types';

export function useFetchEmployment() {
    const [employment, setEmployment] = useState<Employment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEmployment();
    }, []);

    const fetchEmployment = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/employment`);
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