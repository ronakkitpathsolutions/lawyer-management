import { createContext, useState, useEffect } from "react";
import { LOCAL_STORAGE_KEY, ROLES } from "../utils/constants";
import { decodeToken } from "../utils/helper";
import { AUTH_ROUTES } from "../routing/routes";
import useLocalStorage from "../hooks/use-local-storage";
import { REDIRECTION } from ".";
import { useTimeout } from "@mantine/hooks"; // Replaced with custom timeout
import useProfileStore from "@/pages/dashboard/profile/use-profile-store";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken, removeToken] = useLocalStorage(LOCAL_STORAGE_KEY);
  const [user, setUser] = useState(() => {
    if (token) {
      return decodeToken(token);
    }
    return {};
  });

  const role = user.role || "";

  const isAdmin = role === ROLES.ADMIN;

  const redirectUrl = role ? REDIRECTION[role] : AUTH_ROUTES.login.url;

  const login = (newToken) => {
    setToken(newToken);
  };

  const resetAllStores = () => {
    useProfileStore.getState().reset()
  };

  const { start, clear } = useTimeout(() => resetAllStores(), 1000);

  const logout = () => {
    removeToken();
    start();
  };

  useEffect(() => {
    if (token) {
      setUser(decodeToken(token));
    } else {
      setUser({});
    }
  }, [token]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        redirectUrl,
        login,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
