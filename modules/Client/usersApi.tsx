import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const usersApi = createApi({
    reducerPath:'usersApi',
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.NEXT_PUBLIC_URL,
        prepareHeaders: (headers) => {
            // Get the token from local storage
            const token = localStorage.getItem('token');
            
            // If the token is present, set the authorization header
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
      
            return headers;
        },
    }),
    endpoints: (builder) => ({
        loadOrder:builder.query<string,string>({
            query:(orderId:string) => `/client/v1/order/${orderId}`,
        }),
        verifyPayment:builder.query<string,string>({
            query:(orderId:string) =>  `/api/v1/verify-payment/${orderId}`
        })
    })
});

export const { useLoadOrderQuery, useVerifyPaymentQuery } = usersApi