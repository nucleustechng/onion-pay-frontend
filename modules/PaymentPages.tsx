import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentPages = createApi({
  reducerPath: "paymentPages",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
  }),
  endpoints: (builder) => ({
    loadPaymentPages: builder.query<any, any>({
      query: (link: any) => `/client/v1/page/${link}`,
    }),
  }),
});

export const { useLoadPaymentPagesQuery } = paymentPages;
