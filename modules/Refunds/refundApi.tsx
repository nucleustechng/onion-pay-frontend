import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const invoiceApi = createApi({
    reducerPath:'invoiceApi',
    tagTypes:["refunds"],
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
        requestRefund:builder.mutation({
            query: (body:{t_id:string,partial:boolean,amount:number,reason:string}) => {
                return {
                    url:'/api/v1/request-refund',
                    method:'post',
                    body,
                };
            },
            invalidatesTags: ["refunds"]
        }),
    })
});

export const { useRequestRefundMutation } = invoiceApi