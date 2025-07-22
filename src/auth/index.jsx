import { AUTH_ROUTES, MAIN_ROUTES } from "../routing/routes";
import {
  CACHED_URL_LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_KEY,
  ROLES,
} from "../utils/constants";
import {
  decodeToken,
  getLocalStorage,
  isTokenActive,
  setLocalStorage,
} from "../utils/helper";

export const REDIRECTION = {
  [ROLES.ADMIN]: MAIN_ROUTES.clients.url,
  [ROLES.USER]: MAIN_ROUTES.clients.url,
};

export const getAuth = (options = {}) => {
  const { isCacheRedirection } = options || {};

  const token = getLocalStorage(LOCAL_STORAGE_KEY);
  const cachedRedirectUrl = getLocalStorage(CACHED_URL_LOCAL_STORAGE_KEY);
  const isAuthenticated = isTokenActive(token);

  let redirectUrl = AUTH_ROUTES.login.url;
  let role = "";

  if (isAuthenticated) {
    const user = decodeToken(token);
    role = user.role || "";
    redirectUrl = role
      ? cachedRedirectUrl || REDIRECTION[role]
      : AUTH_ROUTES.login.url;
  }

  if (isCacheRedirection && !isAuthenticated) {
    const { pathname, search } = window?.location || {};
    const cachedRedirectUrl = pathname + search;
    setLocalStorage(CACHED_URL_LOCAL_STORAGE_KEY, cachedRedirectUrl);
  }

  return {
    isAuthenticated,
    role,
    redirectUrl,
  };
};
