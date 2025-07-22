import React from "react";
import useProperty from "./use-property";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomDrawer from "@/shared/drawer";
import AddEditForm from "./components/add-edit-form";
import Confirmation from "@/shared/confirmation";
import CustomTable from "@/shared/custom-table";

const PropertyInformation = () => {
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
    selectedPropertyData,
    deleteBulkLoading,
    handleBulkDeleteConfirm,
  } = useProperty();

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Property Information
          </h1>
          <p className="text-gray-600 mt-1">
            Manage client's property information
          </p>
        </div>
        <Button onClick={openDrawer} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Property
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
            searchPlaceholder: "Search by all fields",
            deleteButtonText: "Delete Properties",
            handleDeleteConfirm: handleBulkDeleteConfirm,
            confirmTitle: "Delete Properties",
            deleteLoading: deleteBulkLoading,
            confirmDescription:
              "Are you sure you want to delete the selected properties?",
          }}
          className="w-full"
        />
      </div>

      {/* Custom Drawer */}
      <CustomDrawer
        className="sm:!max-w-[920px]"
        open={isDrawerOpen}
        handleClose={closeDrawer}
        title={selectedPropertyData ? "Edit Property" : "Add New Property"}
      >
        <AddEditForm onClose={closeDrawer} initialData={selectedPropertyData} />
      </CustomDrawer>

      {/* Delete Confirmation Modal */}
      <Confirmation
        open={isOpenDeleteModal}
        handleClose={closeDeleteModal}
        title="Are you sure?"
        description="Are you sure you want to delete this property?"
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
        handleSubmit={handleDeleteConfirm}
      />
    </div>
  );
};

export default PropertyInformation;
