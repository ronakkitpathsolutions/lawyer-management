import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { clientVisaSchema } from "@/utils/validations";
import {
  PLACEHOLDER_MESSAGES as msg,
  ACTION_MESSAGES,
  EXISTING_VISA,
  WISHED_VISA,
  RE_ENTRY_PERMIT_TEXT_OPTIONS,
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
      intended_visa_renewal_date: visa?.intended_visa_renewal_date || "",
      re_entry_permit: visa?.re_entry_permit || "",
      new_visa_expiry_date: visa?.new_visa_expiry_date || "",
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
    // 1️⃣ Current Visa Details
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
      id: "existing_visa_expiry",
      name: "existing_visa_expiry",
      type: "date",
      label: "Existing Visa Expiry",
      placeholder: msg.default("existing visa expiry"),
      withAsterisk: false,
    },

    // 2️⃣ Travel / Re-entry Context
    {
      id: "re_entry_permit",
      name: "re_entry_permit",
      type: "select",
      label: "Re-entry Permit",
      placeholder: msg.select("re-entry permit"),
      options: RE_ENTRY_PERMIT_TEXT_OPTIONS,
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

    // 3️⃣ Renewal & Future Visa Plan
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
      id: "intended_visa_renewal_date",
      name: "intended_visa_renewal_date",
      type: "date",
      label: "Intended Visa Renewal Date",
      placeholder: msg.default("intended visa renewal date"),
      withAsterisk: false,
    },
    {
      id: "new_visa_expiry_date",
      name: "new_visa_expiry_date",
      type: "date",
      label: "New Visa Expiry Date",
      placeholder: msg.default("new visa expiry date"),
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
