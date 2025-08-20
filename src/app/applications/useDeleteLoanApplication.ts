import { useState, useCallback } from "react";
import { notifications } from "../shared/notifications";

export function useDeleteLoanApplication() {
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteApplication = useCallback(async (id: string) => {
    setDeleting(true);
    setDeleteError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete loan application');
      }
      notifications.success('Loan application deleted successfully!');
      return true;
    } catch (err: any) {
      notifications.error(err.message);
      setDeleteError(err.message);
      return false;
    } finally {
      setDeleting(false);
    }
  }, []);

  return { deleteApplication, deleting, deleteError };
}