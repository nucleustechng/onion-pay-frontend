import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const walletApi = createApi({
	reducerPath: "walletApi",
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
		loadWallet: builder.query<any, void>({
			query: () => "/api/v1/wallet",
		}),
	}),
});

export const { useLoadWalletQuery } = walletApi;
