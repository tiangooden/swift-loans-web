import { useState } from 'react';
import { notifications } from '../shared/notifications';
import { Employment } from './types';

export function useSaveEmploymentDetails(onSuccess?: () => void) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const saveEmployment = async (updatedEmployment: Employment) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/employment`, {
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