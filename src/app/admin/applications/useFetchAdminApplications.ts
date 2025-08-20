import { useState, useEffect } from 'react';

export function useFetchAdminApplications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/all`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setApplications(data);
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching loan applications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const filteredLoans = applications.filter((loan: any) => {
    const matchesSearch = loan.user?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.user?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.id.toString().toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || loan.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return {
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    applications: filteredLoans,
    loading,
    error
  };
}