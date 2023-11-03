import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const transationsApi = createApi({
	reducerPath: "transationsApi",
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
		loadTransactions: builder.query<any, void>({
			query: () => "api/v1/transaction-records",
		}),
		loadSingleTransaction: builder.query<string, any>({
			query: (transId: string) => `/api/v1/transaction-record/${transId}`,
		}),
	}),
});

export const { useLoadTransactionsQuery, useLoadSingleTransactionQuery } =
	transationsApi;
