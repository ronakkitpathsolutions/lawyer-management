import React, { useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const CustomTable = ({
  columns = [],
  data = [],
  params,
  setParams,
  loading = false,
  className,
  // Search props
  showSearch = true,
  searchPlaceholder = "Search...",
  // Additional props to pass to render functions
  ...additionalProps
}) => {
  const [localSearchValue, setLocalSearchValue] = useState('');
  const { page: currentPage, limit, totalItems } = params || {};
  const totalPages = Math.ceil(totalItems / limit) || 1;

  // Debounced function for search API calls
  const debouncedHandleSearch = useDebouncedCallback((searchTerm) => {
   setParams({ search: searchTerm, page: 1 });
  }, 500);

  // Function to render cell content
  const renderCellContent = (column, rowData, rowIndex) => {
    // If render function is provided, it has 1st priority
    if (column.render && typeof column.render === "function") {
      return column.render({ rowData, rowIndex, ...additionalProps });
    }

    // Otherwise, use accessorKey to get the value
    if (column.accessorKey) {
      return rowData[column.accessorKey] || "";
    }

    return "-";
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    setLocalSearchValue(searchTerm);
    debouncedHandleSearch(searchTerm);
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    handleSearch(value);
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (setParams && page !== currentPage && page >= 1 && page <= totalPages) {
      setParams({ page });
    }
  };

  // Generate page numbers to show
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis logic
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className={className}>
      {/* Search Input - Separated from table */}
      {showSearch && (
        <div className="mb-2">
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={localSearchValue}
            onChange={handleSearchInputChange}
            className="max-w-sm"
          />
        </div>
      )}

      {/* Table Container */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={column.accessorKey || index}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((rowData, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={column.accessorKey || colIndex}>
                      {renderCellContent(column, rowData, rowIndex)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {setParams && params && totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * limit + 1} to{" "}
            {Math.min(currentPage * limit, totalItems)} of {totalItems}{" "}
            results
          </div>

          <Pagination>
            <PaginationContent>
              {/* Previous Button */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {/* Page Numbers */}
              {generatePageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              {/* Next Button */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
