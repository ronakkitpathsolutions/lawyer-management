import useFetchWithAbort from "@/hooks/use-fetch-with-abort";
import useClientsStore from "./use-clients-store";
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
import { useNavigate } from "react-router";
import { MAIN_ROUTES } from "@/routing/routes";

const useClients = () => {
  const { getAll, data, params, resetParams, setParams, total, loading } =
    useClientsStore();
  const [fetchData] = useFetchWithAbort(getAll);
  const navigate = useNavigate();

  const [isDrawerOpen, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const [deleteData, setDeleteData] = useState({});

  const isOpenDeleteModal = useMemo(
    () => Boolean(deleteData?.id),
    [deleteData]
  );

  // call delete Client API
  const [handleDeleteConfirm, deleteLoading] = useAsyncOperation(async () => {
    if (!deleteData?.id) return;

    await api.client.delete({ id: deleteData.id });
    toastSuccess("Client deleted successfully");
    // Refresh the clients list
    fetchData({ params });
    // Close the delete modal
    closeDeleteModal({});
  });

  const closeDeleteModal = useCallback(() => {
    setDeleteData({});
  }, []);

  const handleRowSelection = useCallback((row = {}) => {
    navigate(MAIN_ROUTES.clients.path + `/${row.id}`);
  }, [navigate]);

  useEffect(() => {
    fetchData({ params });
  }, [fetchData, params]);

  useEffect(() => {
    return () => {
      resetParams();
    };
  }, [resetParams]);

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        isEnableSorting: true,
        cellClassName: "min-w-[180px]",
      },
      {
        header: "Family Name",
        accessorKey: "family_name",
        isEnableSorting: true,
        cellClassName: "min-w-[240px]",
      },
      {
        header: "Email",
        accessorKey: "email",
        isEnableSorting: true,
        cellClassName: "min-w-[240px]",
      },
      {
        header: "Phone",
        accessorKey: "phone_number",
        cellClassName: "min-w-[180px]",
      },
      {
        header: "Nationality",
        accessorKey: "nationality",
        isEnableSorting: true,
        cellClassName: "min-w-[140px]",
      },
      {
        header: "DOB",
        accessorKey: "date_of_birth",
        cellClassName: "min-w-[120px]",
      },
      {
        header: "Actions",
        id: "actions",
        cellClassName: "min-w-[80px]",
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
                onClick={() =>
                  navigate(MAIN_ROUTES.clients.path + `/${rowData.id}`)
                }
              >
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  navigate(MAIN_ROUTES.clients.path + `/edit/${rowData.id}`)
                }
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
    [navigate]
  );

  const [handleBulkDeleteConfirm, deleteBulkLoading] = useAsyncOperation(
    async (ids = []) => {
      if (!ids.length) return;
      await Promise.all(ids.map((id) => api.client.delete({ id })));
      toastSuccess(`${ids.length} client deleted successfully`);
      fetchData({ params });
    }
  );

  return {
    columns,
    data,
    loading,
    params: { ...params, totalItems: total },
    setParams,
    openDrawer,
    isDrawerOpen,
    closeDrawer,
    isOpenDeleteModal,
    closeDeleteModal,
    handleDeleteConfirm,
    deleteLoading,
    handleBulkDeleteConfirm,
    deleteBulkLoading,
    handleRowSelection,
  };
};

export default useClients;
