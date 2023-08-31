import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentPages = createApi({
	reducerPath: "paymentPages",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_URL,
	}),
	endpoints: (builder) => ({
		loadPaymentPages: builder.query<any, any>({
			query: (p_id: any) => `/client/v1/page/:${p_id}`,
		}),
	}),
});

export const { useLoadPaymentPagesQuery } = paymentPages;
