import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  tagTypes: ["refunds"],
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
    requestRefund: builder.mutation({
      query: (body: {
        t_id: string;
        partial: boolean;
        amount: number;
        reason: string;
      }) => {
        return {
          url: "/api/v1/request-refund",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["refunds"],
    }),
  }),
});

export const { useRequestRefundMutation } = invoiceApi;
