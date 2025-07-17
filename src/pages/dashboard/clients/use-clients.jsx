import useFetchWithAbort from "@/hooks/use-fetch-with-abort";
import useClientsStore from "./use-clients-store";
import { useEffect, useMemo } from "react";

const useClients = () => {
  const { getAll, data, params, resetParams, loading } = useClientsStore();
  const [fetchData] = useFetchWithAbort(getAll);

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
        render: ({rowData, rowIndex}) => (
          <div className="flex items-center gap-2">{rowIndex}</div>
        )
      },
    ],
    []
  );

  return {
    columns,
    data,
    loading,
  };
};

export default useClients;
