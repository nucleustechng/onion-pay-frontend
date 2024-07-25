import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const updatewebhookApi = createApi({
  reducerPath: "updatewebhookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
    prepareHeaders: (headers) => {
      // Get the token from local storage
      const token = Cookies.get("token");

      // If the token is present, set the authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateWebhook: builder.mutation({
      query: (body: { url: string; auth_token: string }) => {
        return {
          url: "/api/v1/update-webhook",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useUpdateWebhookMutation } = updatewebhookApi;
