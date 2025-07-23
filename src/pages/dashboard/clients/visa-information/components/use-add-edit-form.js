import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { clientVisaSchema } from "@/utils/validations";
import {
  PLACEHOLDER_MESSAGES as msg,
  ACTION_MESSAGES,
  EXISTING_VISA,
  WISHED_VISA,
} from "@/utils/constants";
import useAsyncOperation from "@/hooks/use-async-operation";
import { api } from "@/api";
import { toastSuccess } from "@/lib/toast";
import useVisaStore from "../use-visa-store";
import { useParams } from "react-router";
import { removeEmptyFields } from "@/utils/helper";

const useAddEditForm = ({ onClose, visa = null }) => {
  const { id } = useParams(); // client id from route params
  const { getAll, params } = useVisaStore();
  const isEditing = Boolean(visa);

  const initialValues = useMemo(
    () => ({
      existing_visa: visa?.existing_visa || "",
      wished_visa: visa?.wished_visa || "",
      existing_visa_expiry: visa?.existing_visa_expiry || "",
      intended_departure_date: visa?.intended_departure_date || "",
      latest_entry_date: visa?.latest_entry_date || "",
    }),
    [visa]
  );

  const methods = useForm({
    resolver: zodResolver(clientVisaSchema),
    defaultValues: initialValues,
    values: initialValues,
  });

  const fieldsData = useMemo(
    () => [
      {
        id: "existing_visa",
        name: "existing_visa",
        type: "autocomplete",
        label: "Existing Visa",
        placeholder: msg.select("existing visa"),
        options: EXISTING_VISA,
        withAsterisk: false,
      },
      {
        id: "wished_visa",
        name: "wished_visa",
        type: "autocomplete",
        label: "Wished Visa",
        placeholder: msg.select("wished visa"),
        options: WISHED_VISA,
        withAsterisk: true,
        focus: true,
      },
      {
        id: "existing_visa_expiry",
        name: "existing_visa_expiry",
        type: "date",
        label: "Existing Visa Expiry",
        placeholder: msg.default("existing visa expiry"),
        withAsterisk: false,
      },
      {
        id: "intended_departure_date",
        name: "intended_departure_date",
        type: "date",
        label: "Intended Departure Date",
        placeholder: msg.default("intended departure date"),
        withAsterisk: false,
      },
      {
        id: "latest_entry_date",
        name: "latest_entry_date",
        type: "date",
        label: "Latest Entry Date",
        placeholder: msg.default("latest entry date"),
        withAsterisk: false,
      },
    ],
    []
  );

  const [onSubmit, loading, notification] = useAsyncOperation(
    async (values) => {
      if (isEditing) {
        await api.visa.update({
          id: visa.id,
          data: removeEmptyFields(values),
        });
        toastSuccess(ACTION_MESSAGES.update("visa"));
      } else {
        await api.visa.create({
          data: {
            ...removeEmptyFields(values),
            client_id: id, // Associate visa with client
          },
        });
        toastSuccess(ACTION_MESSAGES.add("visa"));
      }
      // Refresh the visa list
      await getAll({ id, params });
      // Close the drawer
      onClose();
    },
    () => {
      // Handle specific error cases if needed
      return false;
    }
  );

  return {
    methods,
    fieldsData,
    onSubmit,
    loading,
    notification,
    isEditing,
  };
};

export default useAddEditForm;
