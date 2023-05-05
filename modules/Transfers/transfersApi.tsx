import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const transfersApi = createApi({
    reducerPath:'transationsApi',
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.NEXT_PUBLIC_URL,
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
        transfer:builder.mutation({
            query: (body:{isWallet:boolean,acc_num:string,acc_bank:string,amount:number}) => {
                return {
                    url:'/api/v1/transfer',
                    method:'post',
                    body,
                };
            },
        }),
    })
});

export const { useTransferMutation } = transfersApi