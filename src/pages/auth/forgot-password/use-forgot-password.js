import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { forgotPasswordSchema } from "@/utils/validations";
import {
  PLACEHOLDER_MESSAGES as msg,
  AUTH_MESSAGES,
} from "@/utils/constants";
import useAsyncOperation from "@/hooks/use-async-operation";
import { api } from "@/api";
import { AUTH_ROUTES } from "@/routing/routes";
import { toastSuccess } from "@/lib/toast";

const useForgotPassword = () => {

  const initialValues = {
    email: "",
  };

  const methods = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: initialValues,
  });

  const fieldsData = useMemo(
    () => [
      {
        id: "email",
        name: "email",
        type: "email",
        label: "Email Address",
        placeholder: msg.default("email address"),
        withAsterisk: true,
        focus: true,
      },
    ],
    []
  );

  const [onSubmit, loading, notification] = useAsyncOperation(
    async (values) => {
      await api.auth.forgotPassword({
        data: {
          ...values,
        },
      });
      
      // Show success message
      toastSuccess(AUTH_MESSAGES.forgotPassword);
      
      // Reset form after successful submission
      methods.reset();
    },
    (error) => {
      // Handle specific error cases if needed
      if (error?.data?.status === 404) {
        return true; // Let the error show
      }
      return false; // Use default error handling
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

export default useForgotPassword;