import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  tagTypes: ["invoices"],
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
    createInvoice: builder.mutation({
      query: (body: {
        ref?: string;
        full_name: string;
        email: string;
        phone: string;
        address: string;
        order: [{ name: string; quantity: number; price: number }];
      }) => {
        return {
          url: "/api/v1/send-invoice",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["invoices"],
    }),
    loadInvoices: builder.query<any, void>({
      query: () => "/api/v1/invoices",
      providesTags: ["invoices"],
    }),
  }),
});

export const { useCreateInvoiceMutation, useLoadInvoicesQuery } = invoiceApi;
