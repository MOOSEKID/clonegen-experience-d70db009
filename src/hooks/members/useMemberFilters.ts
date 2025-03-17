
import { useState, useCallback, useEffect } from 'react';
import { Member } from '@/types/memberTypes';

export const useMemberFilters = (initialMembers: Member[] = []) => {
  const [members, setAllMembers] = useState<Member[]>(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);
  const [currentMembers, setCurrentMembers] = useState<Member[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Filter members based on search term and filter type
  useEffect(() => {
    let result = [...members];

    // Apply search filter
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (member) =>
          member.name.toLowerCase().includes(searchLower) ||
          member.email.toLowerCase().includes(searchLower) ||
          (member.phone && member.phone.toLowerCase().includes(searchLower))
      );
    }

    // Apply status filter
    if (filterType !== 'All') {
      result = result.filter((member) => 
        member.status === filterType || 
        member.membershipType === filterType
      );
    }

    setFilteredMembers(result);
    setTotalPages(Math.ceil(result.length / membersPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  }, [members, searchTerm, filterType, membersPerPage]);

  // Update current members based on pagination
  useEffect(() => {
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    setCurrentMembers(filteredMembers.slice(indexOfFirstMember, indexOfLastMember));
  }, [filteredMembers, currentPage, membersPerPage]);

  // Handle search
  const handleSearch = useCallback((search: string) => {
    setSearchTerm(search);
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((filter: string) => {
    setFilterType(filter);
  }, []);

  // Pagination
  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
