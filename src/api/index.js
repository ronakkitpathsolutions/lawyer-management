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
  },
  client: {},
};
