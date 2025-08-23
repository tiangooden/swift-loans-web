import { useState, useEffect } from 'react';
import { Employment } from './types';
import axios from 'axios';

export function useFetchEmployment() {
    const [employment, setEmployment] = useState<Employment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEmployment();
    }, []);

    const fetchEmployment = async () => {
        try {
            const data = (await axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/employment`)).data;
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