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
    profile: ({ data, ...configs }) =>
      client({
        url: "/auth/profile",
        method: METHODS.GET,
        data,
        ...configs,
      }),
  },
  client: {
    getAll : ({ params, ...configs }) =>
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
      delete: ({ id, ...configs }) =>
      client({
        url: `/clients/${id}`,
        method: METHODS.DELETE,
        ...configs,
      }),
  },
};
