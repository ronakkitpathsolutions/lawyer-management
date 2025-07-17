import { APP_TITLE, ROLES } from "../utils/constants";

export const AUTH_ROUTES = {
  layout: {},
  root: { path: "/", url: "/", title: APP_TITLE },
  login: { path: "/login", url: "/login", title: "Login" },
  register: { path: "/register", url: "/register", title: "Registration" },
  forgotPassword: {
    path: "/forgot-password",
    url: "/forgot-password",
    title: "Forgot Password",
  },
  resetPassword: {
    path: "/reset-password",
    url: "/reset-password",
    title: "Reset Password",
  },
};

export const DASHBOARD_ROUTES = {
  layout: { path: "/dashboard" },
  dashboard: {
    index: true,
    roles: Object.values(ROLES),
    url: "/dashboard",
    title: "Dashboard",
  },
};

export const MAIN_ROUTES = {
  clients: {
    path: "/clients",
    roles: Object.values(ROLES),
    url: "/clients",
    title: "Clients",
  },
  profile: {
    path: "/profile",
    roles: Object.values(ROLES),
    url: "/profile",
    title: "Profile",
  },
};
