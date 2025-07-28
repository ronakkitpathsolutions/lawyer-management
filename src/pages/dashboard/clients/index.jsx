import useClients from "./use-clients";
import { Button } from "@/components/ui/button";
import CustomTable from "@/shared/custom-table";
import CustomDrawer from "@/shared/drawer";
import AddEditForm from "./components/add-edit-form";
import { Plus } from "lucide-react";
import Confirmation from "@/shared/confirmation";

const Clients = () => {
  const {
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
    deleteLoading,
    handleBulkDeleteConfirm,
    deleteBulkLoading,
    handleRowSelection
  } = useClients();

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Manage your client information</p>
        </div>
        <Button onClick={openDrawer} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Client
        </Button>
      </div>

      {/* Table Section */}
      <div className="bg-white">
        <CustomTable
          {...{
            params,
            setParams,
            columns,
            data,
            loading,
            handleRowSelection,
            searchPlaceholder: "Search by all fields",
            deleteButtonText: "Delete Clients",
            handleDeleteConfirm: handleBulkDeleteConfirm,
            confirmTitle: "Delete Clients",
            deleteLoading: deleteBulkLoading,
            confirmDescription:
              "Are you sure you want to delete the selected clients?",
          }}
          className="w-full"
        />
      </div>

      {/* Custom Drawer */}
      <CustomDrawer
        open={isDrawerOpen}
        handleClose={closeDrawer}
        title="Add New Client"
      >
        <AddEditForm onClose={closeDrawer} />
      </CustomDrawer>

      {/* Delete Confirmation Modal */}
      <Confirmation
        open={isOpenDeleteModal}
        handleClose={closeDeleteModal}
        title="Are you sure?"
        description="Are you sure you want to delete this client?"
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
        handleSubmit={handleDeleteConfirm}
      />
    </div>
  );
};

export default Clients;
