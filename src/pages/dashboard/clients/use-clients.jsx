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

const useClients = () => {
  const { getAll, data, params, resetParams, setParams, loading } = useClientsStore();
  const [fetchData] = useFetchWithAbort(getAll);

  const [isDrawerOpen, { open: openDrawer, close: closeDrawer }] = useDisclosure(false)

  const [deleteData, setDeleteData] = useState({});

  const isOpenDeleteModal = useMemo(() => Boolean(deleteData?.id), [deleteData]);

  // call delete Client API
  const [handleDeleteConfirm, deleteLoading] = useAsyncOperation(async() => {
    if (!deleteData?.id) return;

    await api.client.delete({ id: deleteData.id });
    toastSuccess("Client deleted successfully");
    // Refresh the clients list
    fetchData({ params });
    // Close the delete modal
    closeDeleteModal({});
  })

  const closeDeleteModal = useCallback(() => {
    setDeleteData({});
  }, []);

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
      },
      {
        header: "Family Name",
        accessorKey: "family_name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Phone",
        accessorKey: "phone_number",
      },
      {
        header: "Nationality",
        accessorKey: "nationality",
      },
      {
        header: "DOB",
        accessorKey: "date_of_birth",
      },
      {
        header: "Actions",
        id: "actions",
        render: ({ rowData, onEdit }) => (
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
                onClick={() => console.log("View client", rowData)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onEdit && onEdit(rowData)}
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
    [setDeleteData]
  );

  return {
    columns,
    data,
    loading,
    params,
    setParams,
    openDrawer,
    isDrawerOpen,
    closeDrawer,
    isOpenDeleteModal,
    closeDeleteModal,
    handleDeleteConfirm, 
    deleteLoading
  };
};

export default useClients;
