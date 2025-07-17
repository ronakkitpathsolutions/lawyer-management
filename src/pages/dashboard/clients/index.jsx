import useClients from "./use-clients"
import { Button } from "@/components/ui/button"
import CustomTable from "@/shared/custom-table"
import { Plus } from "lucide-react"

const Clients = () => {

  const { columns, data, loading, handleAddNewClient } = useClients()
  
  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Manage your client information</p>
        </div>
        <Button 
          onClick={handleAddNewClient}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Client
        </Button>
      </div>

      {/* Table Section */}
      <div className="bg-white">
        <CustomTable
          columns={columns}
          data={data || []}
          isLoading={loading}
          className="w-full"
        />
      </div>
    </div>
  )
}

export default Clients