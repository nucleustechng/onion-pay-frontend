import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';


export const paymentPageApi = createApi({
    reducerPath:'paymentPageApi',
    tagTypes:["paymentpages"],
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.NEXT_PUBLIC_URL,
        prepareHeaders: (headers) => {
            // Get the token from local storage
            const token = Cookies.get('token');
            
            // If the token is present, set the authorization header
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
      
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createPaymentPage:builder.mutation({
            query: (body:{title:string,fixed:boolean,amount:number,
                description:string,redirect_url:string}) => {
                return {
                    url:'/api/v1/create-payment-page',
                    method:'post',
                    body,
                };
            },
            invalidatesTags: ["paymentpages"]
        }),
        updatePaymentPage:builder.mutation({
            query: (body:{title:string,p_id:string,amount:number,
                description:string,redirect_url:string}) => {
                return {
                    url:'/api/v1/update-payment-page',
                    method:'post',
                    body,
                };
            },
            invalidatesTags: ["paymentpages"]
        }),
        deletePaymentPage:builder.mutation({
            query: (pageId) => {
                return {
                    url:`/api/v1/remove-payment-page/${pageId}`,
                    method:'DELETE',
                };
            },
            invalidatesTags: ["paymentpages"]
        }),
        loadPaymentLinks:builder.query<any,void>({
            query:() => '/api/v1/payment-pages',
            providesTags:["paymentpages"]
        })
    })
});

export const { useCreatePaymentPageMutation, useLoadPaymentLinksQuery, useUpdatePaymentPageMutation, useDeletePaymentPageMutation } = paymentPageApi