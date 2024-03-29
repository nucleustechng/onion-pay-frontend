import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const switchEnvironment = createApi({
	reducerPath: "switchEnvironment",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_URL,
		prepareHeaders: (headers) => {
			const token = Cookies.get("token");

			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		toggleMode: builder.mutation({
			query: (isSwitchOn: boolean) => {
				return {
					url: `/api/v1/switch-environment?live=${isSwitchOn}`,
					method: "post",
				};
			},
		}),
	}),
});

export const { useToggleModeMutation } = switchEnvironment;
