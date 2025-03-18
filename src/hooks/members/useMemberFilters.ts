
import { useState, useEffect, useCallback } from 'react';
import { Member } from '@/types/memberTypes';

export const useMemberFilters = (initialMembers: Member[]) => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(initialMembers);
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;

  // Calculate total pages based on filtered members
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  // Set all members - useful when fetching from API
  const setAllMembers = (newMembers: Member[]) => {
    setMembers(newMembers);
  };

  // Filter members based on search term and filter type
  useEffect(() => {
    let result = [...members];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.phone && member.phone.includes(searchTerm))
      );
    }
    
    // Apply status filter
    if (filterType !== 'all') {
      result = result.filter(member => {
        switch (filterType) {
          case 'active':
            return member.status === 'Active';
          case 'inactive':
            return member.status === 'Inactive';
          case 'pending':
            return member.status === 'Pending';
          case 'individual':
            return member.membershipCategory === 'Individual';
          case 'company':
            return member.membershipCategory === 'Company';
          default:
            return true;
        }
      });
    }
    
    setFilteredMembers(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [members, searchTerm, filterType]);

  // Get current members for pagination
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

  // Handle search input change
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((filter: string) => {
    setFilterType(filter);
  }, []);

  // Pagination handlers
  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

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
    setAllMembers
  };
};
