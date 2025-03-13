
import { useState } from 'react';
import { Member } from '@/types/memberTypes';

export const useMemberFilters = (members: Member[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [memberPerPage] = useState(5);
  const [filterType, setFilterType] = useState('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter: string) => {
    setFilterType(filter);
    setCurrentPage(1);
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membershipType.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'active') return matchesSearch && member.status === 'Active';
    if (filterType === 'inactive') return matchesSearch && member.status === 'Inactive';
    if (filterType === 'premium') return matchesSearch && member.membershipType === 'Premium';
    if (filterType === 'standard') return matchesSearch && member.membershipType === 'Standard';
    if (filterType === 'basic') return matchesSearch && member.membershipType === 'Basic';
    
    return matchesSearch;
  });

  const indexOfLastMember = currentPage * memberPerPage;
  const indexOfFirstMember = indexOfLastMember - memberPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(filteredMembers.length / memberPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return {
    searchTerm,
    filterType,
    filteredMembers,
    currentMembers,
    currentPage,
    totalPages,
    handleSearch,
    handleFilterChange,
    paginate,
    nextPage,
    prevPage,
  };
};
