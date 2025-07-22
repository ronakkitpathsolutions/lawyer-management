import useFetchWithAbort from "@/hooks/use-fetch-with-abort";
import usePropertyStore from "./use-property-store";
import { useCallback, useMemo, useEffect, useState } from "react";
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
import { useParams } from "react-router";
import {
    DATE_FORMAT,
    TYPE_OF_TRANSACTION_MAP,
    TYPE_OF_PROPERTY_MAP,
    HANDOVER_DATE_MAP,
} from "@/utils/constants";

const useProperty = () => {
    const { getAll, data, params, resetParams, setParams, loading, total } =
        usePropertyStore();
    const { id } = useParams();
    const [fetchData] = useFetchWithAbort(getAll);

    const [isDrawerOpen, { open: openDrawer, close: closeDrawer }] =
        useDisclosure(false);

    const [deleteData, setDeleteData] = useState({});
    const [selectedPropertyData, setSelectedPropertyData] = useState(null);

    const isOpenDeleteModal = useMemo(
        () => Boolean(deleteData?.id),
        [deleteData]
    );

    // call delete Property API
    const [handleDeleteConfirm, deleteLoading] = useAsyncOperation(async () => {
        if (!deleteData?.id) return;

        await api.property.delete({ id: deleteData.id });
        toastSuccess("Property deleted successfully");
        // Refresh the property list
        fetchData({ id, params });
        // Close the delete modal
        closeDeleteModal({});
    });

    const closeDeleteModal = useCallback(() => {
        setDeleteData({});
    }, []);

    const openAddDrawer = useCallback(() => {
        setSelectedPropertyData(null);
        openDrawer();
    }, [openDrawer]);

    const openEditDrawer = useCallback(
        (propertyData) => {
            setSelectedPropertyData(propertyData);
            openDrawer();
        },
        [openDrawer]
    );

    const handleCloseDrawer = useCallback(() => {
        setSelectedPropertyData(null);
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
                header: "Property Name",
                accessorKey: "property_name",
            },
            {
                header: "Transaction Type",
                accessorKey: "transaction_type",
                render: ({ rowData }) => TYPE_OF_TRANSACTION_MAP[rowData.transaction_type] || "-",
            },
            {
                header: "Property Type",
                accessorKey: "property_type",
                render: ({ rowData }) => TYPE_OF_PROPERTY_MAP[rowData.property_type] || "-",
            },
            {
                header: "Reservation Date",
                accessorKey: "reservation_date",
                render: ({ rowData }) =>
                    rowData.reservation_date
                        ? DATE_FORMAT.date(rowData.reservation_date)
                        : "-",
            },
            {
                header: "Intended Closing Date",
                accessorKey: "intended_closing_date",
                render: ({ rowData }) =>
                    rowData.intended_closing_date
                        ? DATE_FORMAT.date(rowData.intended_closing_date)
                        : "-",
            },
            {
                header: "Handover Date",
                accessorKey: "handover_date",
                render: ({ rowData }) =>
                    rowData.handover_date
                        ? HANDOVER_DATE_MAP[rowData.handover_date] || "-"
                        : "-",
            },
            {
                header: "Selling Price",
                accessorKey: "selling_price",
                render: ({ rowData }) => rowData.selling_price ?? "-",
            },
            {
                header: "Deposit",
                accessorKey: "deposit",
                render: ({ rowData }) => rowData.deposit ?? "-",
            },
            {
                header: "Created At",
                accessorKey: "createdAt",
                render: ({ rowData }) =>
                    rowData.createdAt
                        ? DATE_FORMAT.dateTime(rowData.createdAt)
                        : "-",
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
                                onClick={() => console.log("View Property", rowData)}
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
      await Promise.all(ids.map((id) => api.property.delete({ id })));
      toastSuccess(`${ids.length} property deleted successfully`);
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
        selectedPropertyData,
        deleteBulkLoading,
        handleBulkDeleteConfirm
    };
};

export default useProperty;
