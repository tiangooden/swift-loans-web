import { useState, useEffect } from 'react';

export function useAdminLoanApplications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loanApplications, setLoanApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/applications/all`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLoanApplications(data);
      } catch (error) {
        console.error('Error fetching loan applications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLoanApplications();
  }, []);

  const filteredLoans = loanApplications.filter((loan: any) => {
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
    loanApplications: filteredLoans,
    loading,
  };
}