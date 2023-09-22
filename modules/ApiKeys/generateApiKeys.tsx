import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const generateApiKeys = createApi({
	reducerPath: "generateApiKeys",
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
		loadDevSettings: builder.query<any, void>({
			query: () => "/api/v1/dev-settings",
		}),
		generateKeys: builder.mutation<any, void>({
			query: () => {
				return {
					url: `/api/v1/regenerate-api-keys`,
					method: "post",
				};
			},
		}),
	}),
});

export const { useGenerateKeysMutation, useLoadDevSettingsQuery } =
	generateApiKeys;
