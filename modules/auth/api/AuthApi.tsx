import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const AuthApi = createApi({
	reducerPath: "AuthApi",
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
		signup: builder.mutation({
			query: (body: {
				f_name: string;
				l_name: string;
				email: string;
				phone: string;
				country: string;
				password: string;
				nin: string;
				dob: number;
				address: string;
			}) => {
				return {
					url: "/api/v1/signup ",
					method: "post",
					body,
				};
			},
		}),
		verifyemail: builder.mutation({
			query: (body: { code: string }) => {
				return {
					url: "/api/v1/verify-code",
					method: "post",
					body,
				};
			},
		}),
		requestVerifyCode: builder.mutation({
			query: (body: { email: string }) => {
				return {
					url: "/api/v1/request-code",
					method: "post",
					body,
				};
			},
		}),
		signin: builder.mutation({
			query: (body: { email: string; password: string }) => {
				return {
					url: "/api/v1/signin ",
					method: "post",
					body,
				};
			},
		}),
		forgotPassword: builder.mutation({
			query: (body: { email: string }) => {
				return {
					url: "/api/v1/password-reset",
					method: "post",
					body,
				};
			},
		}),
		resetPassword: builder.mutation({
			query: (body: { email: string; code: string; n_pass: string }) => {
				return {
					url: "/api/v1/reset-password",
					method: "post",
					body,
				};
			},
		}),
		loadEmail: builder.query<any, void>({
			query: () => "/api/v1/contact",
		}),
	}),
});

export const {
	useSignupMutation,
	useVerifyemailMutation,
	useSigninMutation,
	useRequestVerifyCodeMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useLoadEmailQuery,
} = AuthApi;
