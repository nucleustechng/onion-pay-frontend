import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const transationsApi = createApi({
    reducerPath:'transationsApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://onion-pay.herokuapp.com',
        prepareHeaders: (headers) => {
            // Get the token from local storage
            const token = localStorage.getItem('loginToken');

            
            // If the token is present, set the authorization header
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
      
            return headers;
        },
    }),
    endpoints: (builder) => ({
        loadTransactions:builder.query<any,void>({
            query:() => '/api/v1/transactions',
        }),
        loadSingleTransaction:builder.query<string,any>({
            query:(transId:string) => `/api/v1/transaction/${transId}`,
        })
    })
});

export const { useLoadTransactionsQuery,  useLoadSingleTransactionQuery } = transationsApi