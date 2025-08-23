import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFetchAdminApplications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchApplications = async () => {
      try {
        const data = (await axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/all`)).data;
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