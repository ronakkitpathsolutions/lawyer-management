import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { resetPasswordSchema } from "@/utils/validations";
import {
  CACHED_URL_LOCAL_STORAGE_KEY,
  PLACEHOLDER_MESSAGES as msg,
  AUTH_MESSAGES,
} from "@/utils/constants";
import useAsyncOperation from "@/hooks/use-async-operation";
import { api } from "@/api";
import { useNavigate } from "react-router";
import { removeLocalStorage, toastSuccess } from "@/utils/helper";
import useSearchParamsObject from "@/hooks/use-search-params-object";
import { AUTH_ROUTES } from "@/routing/routes";

const useResetPassword = () => {
  const navigate = useNavigate();
  const searchParams = useSearchParamsObject();
  const refreshToken = searchParams.refresh_token;

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const methods = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: initialValues,
  });

  // Redirect to forgot password if no refresh token
  useEffect(() => {
    if (!refreshToken) {
      navigate(AUTH_ROUTES.forgotPassword.url);
    }
  }, [refreshToken, navigate]);

  const fieldsData = useMemo(
    () => [
      {
        id: "newPassword",
        name: "newPassword",
        type: "password",
        label: "New Password",
        placeholder: msg.default("new password"),
        withAsterisk: true,
        focus: true,
      },
      {
        id: "confirmPassword",
        name: "confirmPassword",
        type: "password",
        label: "Confirm Password",
        placeholder: msg.default("confirm password"),
        withAsterisk: true,
      },
    ],
    []
  );

  const [onSubmit, loading, notification] = useAsyncOperation(
    async (values) => {
      if (!refreshToken) {
        throw new Error(
          "Invalid reset token. Please request a new password reset link."
        );
      }

      const res = await api.auth.restPassword({
        data: {
          refresh_token: refreshToken,
          confirmPassword: values.confirmPassword,
          newPassword: values.newPassword,
        }
      });

      toastSuccess(AUTH_MESSAGES.resetPassword);
      if(res?.data?.data) {
        navigate(AUTH_ROUTES.login.url);
        removeLocalStorage(CACHED_URL_LOCAL_STORAGE_KEY);
      }
    },
  );

  return {
    methods,
    fieldsData,
    onSubmit,
    loading,
    notification,
    refreshToken,
  };
};

export default useResetPassword;
