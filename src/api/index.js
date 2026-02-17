import client, { METHODS } from "./client";

export const api = {
  auth: {
    login: ({ data, ...configs }) =>
      client({
        url: "/auth/login",
        method: METHODS.POST,
        data,
        ...configs,
      }),
    forgotPassword: ({ data, ...configs }) =>
      client({
        url: "/auth/forgot-password",
        method: METHODS.POST,
        data,
        ...configs,
      }),
    restPassword: ({ data, params, ...configs }) =>
      client({
        url: "/auth/reset-password",
        method: METHODS.POST,
        data,
        params,
        ...configs,
      }),
    changePassword: ({ data, ...configs }) =>
      client({
        url: "/auth/change-password",
        method: METHODS.POST,
        data,
        ...configs,
      }),
    profile: ({ data, ...configs }) =>
      client({
        url: "/auth/profile",
        method: METHODS.GET,
        data,
        ...configs,
      }),
    updateProfile: ({ data, ...configs }) =>
      client({
        url: "/auth/profile",
        method: METHODS.PUT,
        data,
        ...configs,
      }),
  },
  client: {
    getAll: ({ params, ...configs }) =>
      client({
        url: "/clients",
        method: METHODS.GET,
        params,
        ...configs,
      }),
    get: ({ id, ...configs }) =>
      client({
        url: `/clients/${id}`,
        method: METHODS.GET,
        ...configs,
      }),
    create: ({ data, ...configs }) =>
      client({
        url: "/clients/create",
        method: METHODS.POST,
        data,
        ...configs,
      }),
    update: ({ id, data, ...configs }) =>
      client({
        url: `/clients/${id}`,
        method: METHODS.PATCH,
        data,
        ...configs,
      }),
    delete: ({ id, ...configs }) =>
      client({
        url: `/clients/${id}`,
        method: METHODS.DELETE,
        ...configs,
      }),
  },
  member: {
    delete: ({ id, ...configs }) =>
      client({
        url: `/clients/members/${id}`,
        method: METHODS.DELETE,
        ...configs,
      }),
  },
  visa: {
    getAll: ({ id, params, ...configs }) =>
      client({
        url: `/visas/client/${id}`,
        method: METHODS.GET,
        params,
        ...configs,
      }),
    create: ({ data, ...configs }) =>
      client({
        url: "/visas/create",
        method: METHODS.POST,
        data,
        ...configs,
      }),
    update: ({ id, data, ...configs }) =>
      client({
        url: `/visas/${id}`,
        method: METHODS.PATCH,
        data,
        ...configs,
      }),
    delete: ({ id, ...configs }) =>
      client({
        url: `/visas/${id}`,
        method: METHODS.DELETE,
        ...configs,
      }),
    export: ({ ...configs }) =>
      client({
        url: `/visas/export`,
        method: METHODS.GET,
        responseType: "blob",
        ...configs,
      }),
  },
  property: {
    getAll: ({ id, params, ...configs }) =>
      client({
        url: `/properties/client/${id}`,
        method: METHODS.GET,
        params,
        ...configs,
      }),
    create: ({ data, ...configs }) =>
      client({
        url: "/properties/create",
        method: METHODS.POST,
        data,
        ...configs,
      }),
    update: ({ id, data, ...configs }) =>
      client({
        url: `/properties/${id}`,
        method: METHODS.PATCH,
        data,
        ...configs,
      }),
    delete: ({ id, ...configs }) =>
      client({
        url: `/properties/${id}`,
        method: METHODS.DELETE,
        ...configs,
      }),
  },
};
