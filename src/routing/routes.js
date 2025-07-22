import { APP_TITLE, ROLES } from "../utils/constants";

export const AUTH_ROUTES = {
  layout: {},
  root: {
    path: "/",
    url: "/",
    title: APP_TITLE,
    breadcrumb: { label: "Home", showInBreadcrumb: true }
  },
  login: {
    path: "/login",
    url: "/login",
    title: "Login",
    breadcrumb: { label: "Login", showInBreadcrumb: false }
  },
  register: {
    path: "/register",
    url: "/register",
    title: "Registration",
    breadcrumb: { label: "Register", showInBreadcrumb: false }
  },
  forgotPassword: {
    path: "/forgot-password",
    url: "/forgot-password",
    title: "Forgot Password",
    breadcrumb: { label: "Forgot Password", showInBreadcrumb: false }
  },
  resetPassword: {
    path: "/reset-password",
    url: "/reset-password",
    title: "Reset Password",
    breadcrumb: { label: "Reset Password", showInBreadcrumb: false }
  },
};

export const MAIN_ROUTES = {
  clients: {
    path: "/clients",
    roles: Object.values(ROLES),
    url: "/clients",
    title: "Clients",
    breadcrumb: { label: "Clients", showInBreadcrumb: true, parent: "/dashboard" }
  },
  client: {
    path: "/clients/:id",
    roles: Object.values(ROLES),
    url: "/clients/:id",
    title: "Client",
    breadcrumb: { label: "Client Details", showInBreadcrumb: true, parent: "/clients", isDynamic: true }
  },
  clientEdit: {
    path: "/clients/edit/:id",
    roles: Object.values(ROLES),
    url: "/clients/edit/:id",
    title: "Edit Client",
    breadcrumb: { label: "Edit Client", showInBreadcrumb: true, parent: "/clients/:id", isDynamic: true }
  },
  profile: {
    path: "/profile",
    roles: Object.values(ROLES),
    url: "/profile",
    title: "Profile",
    breadcrumb: { label: "Profile", showInBreadcrumb: true, parent: "/dashboard" }
  },
};

// Client sub-route breadcrumbs
export const CLIENT_SUB_ROUTES = {
  personalInformation: {
    tab: "personal",
    title: "Personal Information",
    breadcrumb: { label: "Personal Information", showInBreadcrumb: true }
  },
  propertyInformation: {
    tab: "property",
    title: "Property Information",
    breadcrumb: { label: "Property Information", showInBreadcrumb: true }
  },
  visaInformation: {
    tab: "visa",
    title: "Visa Information",
    breadcrumb: { label: "Visa Information", showInBreadcrumb: true }
  },
};
