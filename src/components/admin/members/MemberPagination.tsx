
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface MemberPaginationProps {
  filteredCount: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const MemberPagination = ({ 
  filteredCount, 
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
  onPrevPage,
  onNextPage
}: MemberPaginationProps) => {
  return (
    <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Showing {Math.min(5, filteredCount)} of {filteredCount} members
      </div>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                onPrevPage(); 
              }}
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
              onClick={(e) => { 
                e.preventDefault(); 
                onNextPage(); 
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MemberPagination;
