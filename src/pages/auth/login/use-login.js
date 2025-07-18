import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { loginSchema } from "@/utils/validations";
import {
  CACHED_URL_LOCAL_STORAGE_KEY,
  PLACEHOLDER_MESSAGES as msg,
} from "@/utils/constants";
import useAsyncOperation from "@/hooks/use-async-operation";
import { api } from "@/api";
import useAuth from "@/auth/use-auth";
import { useNavigate } from "react-router";
import { getAuth } from "@/auth";
import { removeLocalStorage } from "@/utils/helper";

const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: initialValues,
  });

  const fieldsData = useMemo(
    () => [
      {
        id: "email",
        name: "email",
        type: "email",
        label: "Email",
        placeholder: msg.default("email"),
        withAsterisk: true,
        focus: true,
      },
      {
        id: "password",
        name: "password",
        type: "password",
        label: "Password",
        placeholder: msg.default("password"),
        withAsterisk: true,
      },
    ],
    []
  );

  const [onSubmit, loading, notification] = useAsyncOperation(
    async (values) => {
      const res = await api.auth.login({
        data: {
          ...values,
        },
      });
      login(res?.data?.data);
      const { redirectUrl } = getAuth();
      navigate(redirectUrl);
      removeLocalStorage(CACHED_URL_LOCAL_STORAGE_KEY);
    },
    (error) => {
      if (error?.data?.status === 403) {
        return true;
      }
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
export default useLogin;
