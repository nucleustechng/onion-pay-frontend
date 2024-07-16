import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const singleInvoiceApi = createApi({
  reducerPath: "singleInvoiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
  }),
  endpoints: (builder) => ({
    loadSingleInvoice: builder.query<any, any>({
      query: (i_id: any) => `/client/v1/invoice/${i_id}`,
    }),
  }),
});

export const { useLoadSingleInvoiceQuery } = singleInvoiceApi;
