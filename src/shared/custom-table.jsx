import React, { useState, useMemo, useCallback } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Search,
  X,
  ChevronUp,
  ChevronDown,
  Trash2,
} from "lucide-react";
import Confirmation from "./confirmation";

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
  // Selection actions
  handleDeleteConfirm,
  confirmTitle,
  confirmDescription,
  deleteLoading,
  deleteButtonText = "Delete Rows",
  // Additional props to pass to render functions
  ...additionalProps
}) => {
  const [localSearchValue, setLocalSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const { page: currentPage, limit, totalItems, sortBy, sortOrder } = params || {};
  const totalPages = Math.ceil(totalItems / limit) || 1;

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Debounced function for search API calls
  const debouncedHandleSearch = useDebouncedCallback((searchTerm) => {
    setParams({ search: searchTerm, page: 1 });
  }, 500);

  // Multi-select functionality
  const isAllSelected = useMemo(() => {
    return data.length > 0 && selectedRows.length === data.length;
  }, [data.length, selectedRows.length]);

  const isIndeterminate = useMemo(() => {
    return selectedRows.length > 0 && selectedRows.length < data.length;
  }, [data.length, selectedRows.length]);

  const handleSelectAll = (checked) => {
    const newSelection = checked ? data.map((_, index) => index) : [];
    setSelectedRows(newSelection);
  };

  const handleSelectRow = (rowIndex) => {
    const newSelectedRows = selectedRows.includes(rowIndex)
      ? selectedRows.filter((index) => index !== rowIndex)
      : [...selectedRows, rowIndex];
    setSelectedRows(newSelectedRows);
  };

  // Get selected data
  const selectedData = useMemo(() => {
    return selectedRows.map((index) => data[index]).filter(Boolean);
  }, [selectedRows, data]);

  // Handle delete action
  const handleDelete = () => {
    if (handleDeleteConfirm && selectedData.length > 0) {
      handleDeleteConfirm(selectedData?.map((item) => item.id));
      setSelectedRows([]);
    }
  };
  // Function to render cell content
  const renderCellContent = useCallback(
    (column, rowData, rowIndex) => {
      // If render function is provided, it has 1st priority
      if (column.render && typeof column.render === "function") {
        return column.render({ rowData, rowIndex, ...additionalProps });
      }

      // Otherwise, use accessorKey to get the value
      if (column.accessorKey) {
        return rowData[column.accessorKey] || "";
      }

      return "-";
    },
    [additionalProps]
  );

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

  // Handle clear search
  const handleClearSearch = useCallback(() => {
    setLocalSearchValue("");
    debouncedHandleSearch("");
  }, [debouncedHandleSearch]);

  // Handle page change
  const handlePageChange = (page) => {
    if (setParams && page !== currentPage && page >= 1 && page <= totalPages) {
      setParams({ page });
    }
  };

  // Handle sorting
  const handleSort = useCallback((column) => {
    if (!column.isEnableSorting || !setParams) return;

    const currentSortBy = sortBy;
    const currentSortOrder = sortOrder;
    const columnKey = column.accessorKey;

    // If clicking the same column, toggle sort order
    if (currentSortBy === columnKey) {
      const newSortOrder = currentSortOrder === 'ASC' ? 'DESC' : 'ASC';
      setParams({ sortBy: columnKey, sortOrder: newSortOrder, page: 1 });
    } else {
      // If clicking a new column, set it to ascending
      setParams({ sortBy: columnKey, sortOrder: 'ASC', page: 1 });
    }
  }, [sortBy, sortOrder, setParams]);

  // Get sort icon for a column
  const getSortIcon = useCallback((column) => {
    if (!column.isEnableSorting) return null;

    const columnKey = column.accessorKey;
    const isActive = sortBy === columnKey;

    if (!isActive) {
      return (
        <div className="flex flex-col opacity-50">
          <ChevronUp className="h-3 w-3 text-gray-400" />
          <ChevronDown className="h-3 w-3 text-gray-400 -mt-1" />
        </div>
      );
    }

    if (sortOrder === 'asc') {
      return <ChevronUp className="h-4 w-4 text-gray-700" />;
    } else {
      return <ChevronDown className="h-4 w-4 text-gray-700" />;
    }
  }, [sortBy, sortOrder]);

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
    <div className={`${className} relative`}>
      {/* Search Input - Separated from table */}
      <div className="flex items-center gap-4 w-full mb-4">
        {showSearch && (
            <div className="relative w-full lg:w-[320px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={localSearchValue}
                onChange={handleSearchInputChange}
                className="pl-10 pr-10 border-gray-300 focus:ring-0 h-10 w-full"
              />
              {localSearchValue && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
        )}
        {selectedRows.length > 0 && (
            <div className="bg-primary rounded-lg px-6 py-[3px] flex items-center justify-center gap-4 shadow-lg border border-primary max-w-fit">
              <span className="text-white font-medium">
                {selectedRows.length} Selected
              </span>
              {/* Divider */}
              <div className="w-px h-6 bg-white"></div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setShowDeleteConfirmation(true)}
                  variant="ghost"
                  size="sm"
                  className="text-white text-sm !pl-0 hover:text-white px-4 py-2 rounded-md hover:bg-transparent"
                >
                  <Trash2 className="h-5 w-5" />
                  {deleteButtonText}
                </Button>
              </div>
            </div>
        )}
      </div>

      {/* Selection Toolbar - Shows when items are selected */}

      {/* Table Container */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-200">
              <TableHead className="w-12 px-4 py-3">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  className="border-gray-300"
                />
              </TableHead>
              {columns.map((column, index) => (
                <TableHead
                  key={column.accessorKey || index}
                  className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.isEnableSorting ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {column.isEnableSorting && getSortIcon(column)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-12"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                    <span className="text-gray-500">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((rowData, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={`hover:bg-gray-50 transition-colors ${
                    selectedRows.includes(rowIndex) ? "bg-blue-50" : ""
                  }`}
                >
                  <TableCell className="px-4 py-4">
                    <Checkbox
                      checked={selectedRows.includes(rowIndex)}
                      onCheckedChange={() => handleSelectRow(rowIndex)}
                      className="border-gray-300"
                    />
                  </TableCell>
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={column.accessorKey || colIndex}
                      className="px-4 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {renderCellContent(column, rowData, rowIndex)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-12"
                >
                  <div className="text-gray-500">No data available</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {setParams && params && (
        <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">
              Showing {(currentPage - 1) * limit + 1} to{" "}
              {Math.min(currentPage * limit, totalItems)} of {totalItems}{" "}
              results
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Pagination>
              <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`px-3 py-2 text-sm ${
                      currentPage === 1
                        ? "pointer-events-none opacity-50 text-gray-400"
                        : "cursor-pointer text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  />
                </PaginationItem>

                {/* Page Numbers */}
                {generatePageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === "..." ? (
                      <PaginationEllipsis className="px-3 py-2 text-gray-400" />
                    ) : (
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                        className="px-3 py-2 text-sm cursor-pointer"
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
                    className={`px-3 py-2 text-sm ${
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50 text-gray-400"
                        : "cursor-pointer text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Confirmation
        open={showDeleteConfirmation}
        handleClose={() => setShowDeleteConfirmation(false)}
        title={confirmTitle || "Confirm Deletion"}
        description={
          confirmDescription || "Are you sure you want to delete this client?"
        }
        confirmText={"Delete"}
        cancelText={"Cancel"}
        loading={deleteLoading}
        handleSubmit={handleDelete}
      />
    </div>
  );
};

export default CustomTable;
