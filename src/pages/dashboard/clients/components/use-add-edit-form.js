import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { clientPersonalInfoSchema } from "@/utils/validations";
import {
  PLACEHOLDER_MESSAGES as msg,
  ACTION_MESSAGES,
} from "@/utils/constants";
import useAsyncOperation from "@/hooks/use-async-operation";
import { api } from "@/api";
import { toastSuccess } from "@/lib/toast";
import useClientsStore from "../use-clients-store";

const useAddEditForm = ({ onClose, client = null }) => {
  const { getAll, params } = useClientsStore();
  const isEditing = Boolean(client);

  const initialValues = {
    name: client?.name || "",
    family_name: client?.family_name || "",
    email: client?.email || "",
    nationality: client?.nationality || "",
    date_of_birth: client?.date_of_birth || "",
    phone_number: client?.phone_number || "",
    current_address: client?.current_address || "",
  };

  const methods = useForm({
    resolver: zodResolver(clientPersonalInfoSchema),
    defaultValues: initialValues,
    values: initialValues,
  });

  const fieldsData = useMemo(
    () => [
      {
        id: "name",
        name: "name",
        type: "text",
        label: "Name",
        placeholder: msg.default("name"),
        withAsterisk: true,
        focus: true,
      },
      {
        id: "family_name",
        name: "family_name",
        type: "text",
        label: "Family Name",
        placeholder: msg.default("family name"),
        withAsterisk: true,
      },
      {
        id: "email",
        name: "email",
        type: "email",
        label: "Email",
        placeholder: msg.default("email"),
        withAsterisk: true,
      },
      {
        id: "nationality",
        name: "nationality",
        type: "text",
        label: "Nationality",
        placeholder: msg.default("nationality"),
        withAsterisk: true,
      },
      {
        id: "date_of_birth",
        name: "date_of_birth",
        type: "date",
        label: "Date of Birth",
        placeholder: msg.default("date of birth"),
        withAsterisk: true,
      },
      {
        id: "phone_number",
        name: "phone_number",
        type: "tel",
        label: "Phone Number",
        placeholder: msg.default("phone number"),
        withAsterisk: true,
      },
      {
        id: "current_address",
        name: "current_address",
        type: "textarea",
        label: "Current Address",
        placeholder: msg.default("current address"),
        withAsterisk: true,
      },
    ],
    []
  );

  const [onSubmit, loading, notification] = useAsyncOperation(
    async (values) => {
      if (isEditing) {
        await api.client.update({
          id: client.id,
          data: values,
        });
        toastSuccess(ACTION_MESSAGES.update("client"));
      } else {
        await api.client.create({
          data: values,
        });
        toastSuccess(ACTION_MESSAGES.add("client"));
      }

      // Refresh the clients list and wait for it to complete
      await getAll({ params });

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
