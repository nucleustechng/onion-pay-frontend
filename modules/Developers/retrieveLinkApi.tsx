import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const retrieveLinkApi = createApi({
  reducerPath: "retrieveLinkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
    prepareHeaders: (headers) => {
      // Get the token from local storage
      const token = "OPTESTSECK_081c4a5fa1349e7e055f6cb6d40e0e31-1679943067667";

      // If the token is present, set the authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    retrieveLink: builder.mutation({
      query: (body: {
        reference: string;
        amount: number;
        customer: {
          email: string;
          name: string;
          phone: string;
        };
        customizations: {
          title: string;
          description: string;
          logo: string;
        };
        redirect_url: string;
      }) => {
        return {
          url: "/api/d1/pay/direct-charge",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useRetrieveLinkMutation } = retrieveLinkApi;
