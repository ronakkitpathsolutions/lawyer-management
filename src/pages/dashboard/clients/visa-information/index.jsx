import { Plus } from "lucide-react";
import Confirmation from "@/shared/confirmation";
import { Button } from "@/components/ui/button";
import CustomTable from "@/shared/custom-table";
import CustomDrawer from "@/shared/drawer";
import useVisaInformation from "./use-visa-information";
import AddEditForm from "./components/add-edit-form";

const VisaInformation = () => {
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
    selectedVisaData,
    handleBulkDeleteConfirm,
    deleteBulkLoading,
    handleRowSelection,
  } = useVisaInformation();

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visa Information</h1>
          <p className="text-gray-600 mt-1">Manage client's visa information</p>
        </div>
        <Button onClick={openDrawer} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Visa
        </Button>
      </div>

      {/* Table Section */}
      <div className="bg-white">
        <CustomTable
          {...{
            params,
            setParams,
            handleRowSelection,
            columns,
            data,
            loading,
            searchPlaceholder: "Search by all fields",
            deleteButtonText: "Delete Visas",
            handleDeleteConfirm: handleBulkDeleteConfirm,
            confirmTitle: "Delete Visas",
            deleteLoading: deleteBulkLoading,
            confirmDescription:
              "Are you sure you want to delete the selected visas?",
          }}
          className="w-full"
        />
      </div>

      {/* Custom Drawer */}
      <CustomDrawer
        open={isDrawerOpen}
        handleClose={closeDrawer}
        title={selectedVisaData ? "Edit Visa" : "Add New Visa"}
      >
        <AddEditForm onClose={closeDrawer} initialData={selectedVisaData} />
      </CustomDrawer>

      {/* Delete Confirmation Modal */}
      <Confirmation
        open={isOpenDeleteModal}
        handleClose={closeDeleteModal}
        title="Are you sure?"
        description="Are you sure you want to delete this visa?"
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
        handleSubmit={handleDeleteConfirm}
      />
    </div>
  );
};

export default VisaInformation;
