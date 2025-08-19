import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
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

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-100';
    case 'pending': return 'text-yellow-600 bg-yellow-100';
    case 'paid': return 'text-blue-600 bg-blue-100';
    case 'overdue': return 'text-red-600 bg-red-100';
    case 'suspended': return 'text-gray-600 bg-gray-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const getStatusIcon = (status: string, props: React.SVGProps<SVGSVGElement>) => {
  switch (status) {
    case 'active': return <CheckCircle {...props} />;
    case 'pending': return <Clock {...props} />;
    case 'paid': return <CheckCircle {...props} />;
    case 'overdue': return <AlertTriangle {...props} />;
    case 'suspended': return <AlertTriangle {...props} />;
    default: return <Clock {...props} />;
  }
};