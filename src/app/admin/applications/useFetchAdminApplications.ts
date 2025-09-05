import { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export function useFetchAdminApplications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const { data = [], isPending, error } = useQuery<any[], Error>({
    queryKey: [useFetchAdminApplicationsKey],
    queryFn: async () => {
      return axios.get(`${process.env.NEXT_PUBLIC_SWIFT_LOANS_API}/api/admin/applications`).then(res => res.data);
    },
  });

  const filteredLoans = data.filter((loan: any) => {
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
    data: filteredLoans,
    isPending,
    error
  };
}

export const useFetchAdminApplicationsKey = 'adminApplications';