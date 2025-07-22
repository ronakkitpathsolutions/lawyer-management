import { createBrowserRouter, redirect } from "react-router";
import { getAuth } from "../auth";

// Routes
import { AUTH_ROUTES, MAIN_ROUTES } from "./routes";

// Layouts
import AuthLayout from "../layouts/auth-layout";
import DashboardLayout from "../layouts/dashboard-layout";

// Auth pages
import Login from "../pages/auth/login";
import ForgotPassword from "../pages/auth/forgot-password";
import ResetPassword from "../pages/auth/reset-password";

// Dashboard pages
import Profile from "../pages/dashboard/profile";
import Clients from "../pages/dashboard/clients";
import ClientInformation from "@/pages/dashboard/clients/components/client-information";


import PageNotFound from "@/components/not-found";

const authLayoutLoader = () => {
  const { isAuthenticated, redirectUrl } = getAuth();
  if (isAuthenticated) {
    return redirect(redirectUrl);
  }
  return null;
};

const dashboardLayoutLoader = () => {
  const { isAuthenticated, redirectUrl } = getAuth({
    isCacheRedirection: true,
  });

  if (!isAuthenticated) {
    return redirect(redirectUrl);
  }
  return null;
};

const dashboardPageLoader = (roles) => () => {
  const { isAuthenticated, role } = getAuth();

  if (isAuthenticated && !roles.includes(role)) {
    return redirect("/404");
  }

  return null;
};

export const router = createBrowserRouter([
  {
    ...AUTH_ROUTES.layout,
    Component: AuthLayout,
    loader: authLayoutLoader,
    children: [
      {
        ...AUTH_ROUTES.root,
        loader: () => {
          return redirect(AUTH_ROUTES.login.url);
        },
      },
      { ...AUTH_ROUTES.login, Component: Login },
      { ...AUTH_ROUTES.forgotPassword, Component: ForgotPassword },
      { ...AUTH_ROUTES.resetPassword, Component: ResetPassword },
    ],
  },
  {
    ...MAIN_ROUTES.clients,
    Component: DashboardLayout,
    loader: dashboardLayoutLoader,
    children: [
      {
        index: true,
        Component: Clients,
        loader: dashboardPageLoader(MAIN_ROUTES.clients.roles),
      },
      {
        ...MAIN_ROUTES.client,
        Component: ClientInformation,
        loader: dashboardPageLoader(MAIN_ROUTES.client.roles),
      },
      {
        ...MAIN_ROUTES.clientEdit,
        Component: ClientInformation,
        loader: dashboardPageLoader(MAIN_ROUTES.clientEdit.roles),
      },
    ],
  },
  {
    ...MAIN_ROUTES.profile,
    Component: DashboardLayout,
    loader: dashboardLayoutLoader,
    children: [
      {
        index: true,
        Component: Profile,
        loader: dashboardPageLoader(MAIN_ROUTES.profile.roles),
      },
    ],
  },
  { path: "*", Component: PageNotFound },
]);
