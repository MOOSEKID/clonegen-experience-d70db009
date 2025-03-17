
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface MemberPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  filteredCount?: number;
  totalCount?: number;
  itemsPerPage: number;
  membersPerPage?: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
}

const MemberPagination = ({ 
  currentPage,
  totalPages,
  totalItems,
  filteredCount = 0,
  totalCount = 0,
  itemsPerPage,
  membersPerPage,
  onPageChange,
  onItemsPerPageChange,
  onPrevPage,
  onNextPage
}: MemberPaginationProps) => {
  const handlePrevClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) {
      if (onPrevPage) {
        onPrevPage();
      } else {
        onPageChange(currentPage - 1);
      }
    }
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      if (onNextPage) {
        onNextPage();
      } else {
        onPageChange(currentPage + 1);
      }
    }
  };

  // Choose the value to display (support both property names)
  const effectivePerPage = membersPerPage || itemsPerPage;
  const displayFilteredCount = filteredCount || totalItems;
  const displayTotalCount = totalCount || totalItems;

  return (
    <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Showing {Math.min(effectivePerPage, displayFilteredCount)} of {displayFilteredCount} members
      </div>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={handlePrevClick}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {/* Generate page buttons */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Adjust displayed page numbers when we have many pages
            let pageToShow = i + 1;
            if (totalPages > 5 && currentPage > 3) {
              pageToShow = currentPage - 3 + i + 1;
              if (pageToShow > totalPages) {
                pageToShow = totalPages - (4 - i);
              }
            }
            
            return (
              <PaginationItem key={pageToShow}>
                <PaginationLink 
                  href="#" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    onPageChange(pageToShow); 
                  }}
                  isActive={currentPage === pageToShow}
                >
                  {pageToShow}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={handleNextClick}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MemberPagination;
