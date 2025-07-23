import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { clientFullInformationSchema } from "@/utils/validations";
import {
  PLACEHOLDER_MESSAGES as msg,
  ACTION_MESSAGES,
} from "@/utils/constants";
import { removeEmptyFields } from "@/utils/helper";
import useAsyncOperation from "@/hooks/use-async-operation";
import { api } from "@/api";
import { toastSuccess } from "@/lib/toast";
import { useParams } from "react-router";
import usePersonalInformationStore from "./use-personal-store";
import useFetchWithAbort from "@/hooks/use-fetch-with-abort";

const usePersonalInformation = () => {
  const { id } = useParams();
  const {
    getData,
    data
  } = usePersonalInformationStore();
  const [fetchData] = useFetchWithAbort(getData);

const initialValues = useMemo(() => ({
    id: data?.id || undefined,
    // Personal Information
    name: data?.name || "",
    family_name: data?.family_name || "",
    email: data?.email || "",
    nationality: data?.nationality || "",
    date_of_birth: data?.date_of_birth || "",
    phone_number: data?.phone_number || "",
    current_address: data?.current_address || "",

    // Additional Information
    passport_number: data?.passport_number || "",
    age: data?.age ? Number(data.age) : "",
    address_in_thailand: data?.address_in_thailand || "",
    whatsapp: data?.whatsapp || "",
    line: data?.line || "",
    marital_status: data?.marital_status || undefined,
    father_name: data?.father_name || "",
    mother_name: data?.mother_name || "",
    married_to_thai_and_registered: data?.married_to_thai_and_registered || false,
    has_yellow_or_pink_card: data?.has_yellow_or_pink_card || false,
    has_bought_property_in_thailand: data?.has_bought_property_in_thailand || false,
    is_active: data?.is_active ?? true,
}), [data]);

  useEffect(() => {
    if (id) {
        fetchData({ id });
    }
  }, [fetchData, id]);

  const methods = useForm({
    resolver: zodResolver(clientFullInformationSchema),
    defaultValues: initialValues,
    values: initialValues,
  });

  // Reset form when data changes to ensure all fields are properly updated
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      methods.reset(initialValues);
    }
  }, [methods, initialValues, data]);

  const fieldsData = useMemo(
    () => [
      // Personal Information Section
      {
        id: "name",
        name: "name",
        type: "text",
        label: "Name",
        placeholder: msg.default("name"),
        withAsterisk: true,
        focus: true,
        section: "personal",
      },
      {
        id: "family_name",
        name: "family_name",
        type: "text",
        label: "Family Name",
        placeholder: msg.default("family name"),
        withAsterisk: true,
        section: "personal",
      },
      {
        id: "email",
        name: "email",
        type: "email",
        label: "Email",
        placeholder: msg.default("email"),
        withAsterisk: true,
        section: "personal",
      },
      {
        id: "passport_number",
        name: "passport_number",
        type: "text",
        label: "Passport Number",
        placeholder: msg.default("passport number"),
        section: "personal",
      },
      {
        id: "nationality",
        name: "nationality",
        type: "text",
        label: "Nationality",
        placeholder: msg.default("nationality"),
        withAsterisk: true,
        section: "personal",
      },
      {
        id: "date_of_birth",
        name: "date_of_birth",
        type: "date",
        label: "Date of Birth",
        placeholder: msg.default("date of birth"),
        withAsterisk: true,
        section: "personal",
      },
      {
        id: "age",
        name: "age",
        type: "number",
        label: "Age",
        placeholder: msg.default("age"),
        section: "personal",
      },
      {
        id: "marital_status",
        name: "marital_status",
        type: "select",
        label: "Marital Status",
        placeholder: msg.select("marital status"),
        options: [
          { value: "single", label: "Single" },
          { value: "married", label: "Married" },
          { value: "common_law", label: "Common Law" },
          { value: "divorced", label: "Divorced" },
          { value: "widowed", label: "Widowed" },
        ],
        section: "personal",
      },

      // Contact Information Section
      {
        id: "phone_number",
        name: "phone_number",
        type: "phone",
        label: "Phone Number",
        placeholder: msg.default("phone number"),
        withAsterisk: true,
        section: "contact",
      },
      {
        id: "whatsapp",
        name: "whatsapp",
        type: "tel",
        label: "WhatsApp Number",
        placeholder: msg.default("WhatsApp number"),
        section: "contact",
      },
      {
        id: "line",
        name: "line",
        type: "text",
        label: "Line ID",
        placeholder: msg.default("Line ID"),
        section: "contact",
      },

      // Address Information Section
      {
        id: "current_address",
        name: "current_address",
        type: "textarea",
        label: "Current Address",
        placeholder: msg.default("current address"),
        withAsterisk: true,
        section: "address",
      },
      {
        id: "address_in_thailand",
        name: "address_in_thailand",
        type: "textarea",
        label: "Address in Thailand",
        placeholder: msg.default("address in Thailand"),
        section: "address",
      },

      // Family Information Section
      {
        id: "father_name",
        name: "father_name",
        type: "text",
        label: "Father's Name",
        placeholder: msg.default("father's name"),
        section: "family",
      },
      {
        id: "mother_name",
        name: "mother_name",
        type: "text",
        label: "Mother's Name",
        placeholder: msg.default("mother's name"),
        section: "family",
      },

      // Status Information Section
      {
        id: "married_to_thai_and_registered",
        name: "married_to_thai_and_registered",
        type: "checkbox",
        label: "Married to Thai and Registered?",
        section: "status",
      },
      {
        id: "has_yellow_or_pink_card",
        name: "has_yellow_or_pink_card",
        type: "checkbox",
        label: "Has Yellow or Pink Card?",
        section: "status",
      },
      {
        id: "has_bought_property_in_thailand",
        name: "has_bought_property_in_thailand",
        type: "checkbox",
        label: "Has Bought Property in Thailand?",
        section: "status",
      },
      {
        id: "is_active",
        name: "is_active",
        type: "checkbox",
        label: "Active Status",
        section: "status",
      },
    ],
    []
  );

  const [onSubmit, loading, notification] = useAsyncOperation(
    async (values) => {
      // Convert age to number if it exists and is not empty
      const processedValues = {
        ...values,
        age: values.age ? Number(values.age) : undefined,
      };
      
      await api.client.update({
        id: processedValues.id, // Assuming the ID will be in the form values
        data: removeEmptyFields(processedValues),
      });
      toastSuccess(ACTION_MESSAGES.update("client"));
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
  };
};

export default usePersonalInformation;
