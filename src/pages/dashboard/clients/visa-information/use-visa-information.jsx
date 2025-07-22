import useFetchWithAbort from "@/hooks/use-fetch-with-abort";
import useVisaStore from "./use-visa-store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import useAsyncOperation from "@/hooks/use-async-operation";
import { toastSuccess } from "@/lib/toast";
import { api } from "@/api";
import {
  DATE_FORMAT,
  EXISTING_VISA_MAP,
  WISHED_VISA_MAP,
} from "@/utils/constants";
import { useParams } from "react-router";

const useVisaInformation = () => {
  const { getAll, data, params, resetParams, setParams, loading, total } =
    useVisaStore();
  const { id } = useParams();
  const [fetchData] = useFetchWithAbort(getAll);

  const [isDrawerOpen, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const [deleteData, setDeleteData] = useState({});
  const [selectedVisaData, setSelectedVisaData] = useState(null);

  const isOpenDeleteModal = useMemo(
    () => Boolean(deleteData?.id),
    [deleteData]
  );

  // call delete Visa API
  const [handleDeleteConfirm, deleteLoading] = useAsyncOperation(async () => {
    if (!deleteData?.id) return;

    await api.visa.delete({ id: deleteData.id });
    toastSuccess("Visa deleted successfully");
    // Refresh the visa list
    fetchData({ id, params });
    // Close the delete modal
    closeDeleteModal({});
  });

  const closeDeleteModal = useCallback(() => {
    setDeleteData({});
  }, []);

  const openAddDrawer = useCallback(() => {
    setSelectedVisaData(null);
    openDrawer();
  }, [openDrawer]);

  const openEditDrawer = useCallback(
    (visaData) => {
      setSelectedVisaData(visaData);
      openDrawer();
    },
    [openDrawer]
  );

  const handleCloseDrawer = useCallback(() => {
    setSelectedVisaData(null);
    closeDrawer();
  }, [closeDrawer]);

  useEffect(() => {
    if (id) {
      fetchData({ id, params });
    }
  }, [fetchData, id, params]);

  useEffect(() => {
    return () => {
      resetParams();
    };
  }, [resetParams]);

  const columns = useMemo(
    () => [
      {
        header: "Existing Visa",
        accessorKey: "existing_visa",
        render: ({ rowData }) =>
          rowData?.existing_visa
            ? EXISTING_VISA_MAP[rowData.existing_visa]
            : "-",
      },
      {
        header: "Wished Visa",
        accessorKey: "wished_visa",
        render: ({ rowData }) =>
          rowData?.wished_visa ? WISHED_VISA_MAP[rowData.wished_visa] : "-",
      },
      {
        header: "Existing Visa Expiry",
        accessorKey: "existing_visa_expiry",
        render: ({ rowData }) =>
          rowData?.existing_visa_expiry
            ? DATE_FORMAT.date(rowData.existing_visa_expiry)
            : "-",
      },
      {
        header: "Latest Entry Date",
        accessorKey: "latest_entry_date",
        render: ({ rowData }) =>
          rowData?.latest_entry_date
            ? DATE_FORMAT.date(rowData.latest_entry_date)
            : "-",
      },
      {
        header: "Intended Departure",
        accessorKey: "intended_departure_date",
        render: ({ rowData }) =>
          rowData?.intended_departure_date
            ? DATE_FORMAT.date(rowData.intended_departure_date)
            : "-",
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        render: ({ rowData }) => DATE_FORMAT.dateTime(rowData.createdAt),
      },
      {
        header: "Actions",
        id: "actions",
        render: ({ rowData }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => openEditDrawer(rowData)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => openEditDrawer(rowData)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeleteData(rowData)}
                className="text-red-600 focus:text-red-600 cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [openEditDrawer]
  );

  const [handleBulkDeleteConfirm, deleteBulkLoading] = useAsyncOperation(
    async (ids = []) => {
      if (!ids.length) return;
      await Promise.all(ids.map((id) => api.visa.delete({ id })));
      toastSuccess(`${ids.length} visa deleted successfully`);
      fetchData({ id, params });
    }
  );

  return {
    columns,
    data,
    loading,
    params: { ...params, totalItems: total },
    setParams,
    openDrawer: openAddDrawer,
    isDrawerOpen,
    closeDrawer: handleCloseDrawer,
    isOpenDeleteModal,
    closeDeleteModal,
    handleDeleteConfirm,
    deleteLoading,
    selectedVisaData,
    handleBulkDeleteConfirm,
    deleteBulkLoading,
  };
};

export default useVisaInformation;
