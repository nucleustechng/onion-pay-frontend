import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const switchEnvironment = createApi({
    reducerPath: "switchEnvironment",
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_URL,
      prepareHeaders: (headers) => {
        const token = localStorage.getItem("loginToken");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
      toggleMode: builder.query<any, boolean>({
        query: (isSwitchOn) =>
          `/api/v1/switch-environment?live=${isSwitchOn}`,
      }),
    }),
  });
  
  export const { useToggleModeQuery } = switchEnvironment;
  