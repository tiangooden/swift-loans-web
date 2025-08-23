import { useState } from 'react';
import { notifications } from '../shared/notifications';
import { Employment } from './types';
import axios from 'axios';

export function useSaveEmployment(onSuccess?: () => void) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const saveEmployment = async (updatedEmployment: Employment) => {
        setLoading(true);
        setError(null);
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/employment`, updatedEmployment);
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