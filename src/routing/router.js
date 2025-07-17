import { createBrowserRouter, redirect } from "react-router";
import { getAuth } from "../auth";

// Routes
import { AUTH_ROUTES, DASHBOARD_ROUTES } from "./routes";

// Pages
import { PageNotFound } from "../components";

// Layouts
import PlainLayout from "../layouts/plain-layout";
import AuthLayout from "../layouts/auth-layout";
import DashboardLayout from "../layouts/dashboard-layout";

// Auth pages
import Login from "../pages/auth/login";
import ForgotPassword from "../pages/auth/forgot-password";
import ResetPassword from "../pages/auth/reset-password";

// Dashboard pages
import DashboardRoot from "../pages/dashboard/root";
import Profile from "../pages/dashboard/profile";
import Clients from "../pages/dashboard/clients";

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
    ...DASHBOARD_ROUTES.layout,
    Component: DashboardLayout,
    loader: dashboardLayoutLoader,
    children: [
      {
        ...DASHBOARD_ROUTES.dashboard,
        Component: DashboardRoot,
        loader: dashboardPageLoader(DASHBOARD_ROUTES.dashboard.roles),
      },
      {
        ...DASHBOARD_ROUTES.clients,
        Component: Clients,
        loader: dashboardPageLoader(DASHBOARD_ROUTES.clients.roles),
        children: [
          {
            index: true,
            loader: () => {
              return redirect(DASHBOARD_ROUTES.clients.url);
            },
          },
        ],
      },
      {
        ...DASHBOARD_ROUTES.profile,
        Component: Profile,
        loader: dashboardPageLoader(DASHBOARD_ROUTES.profile.roles),
      },
    ],
  },
  { path: "*", Component: PageNotFound },
]);
