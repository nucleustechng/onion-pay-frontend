import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const passwordApi = createApi({
    reducerPath:'passwordApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://onion-pay.herokuapp.com',
    }),
    endpoints: (builder) => ({
        forgotPassword:builder.mutation({
            query: (body: {email:string}) => {
                return {
                    url:'/api/v1/password-reset',
                    method:'post',
                    body
                }
            }
        }),
        resetPassword:builder.mutation({
            query: (body: {email:string,code:string,n_pass:string}) => {
                return {
                    url: '/api/v1/reset-password',
                    method:'post',
                    body
                }
            }
        })
    })
});

export const { useForgotPasswordMutation, useResetPasswordMutation } = passwordApi