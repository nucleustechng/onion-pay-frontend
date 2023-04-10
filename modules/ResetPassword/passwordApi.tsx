import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const passwordApi = createApi({
    reducerPath:'passwordApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://onion-pay.herokuapp.com',
        prepareHeaders: (headers) => {
            // Get the token from local storage
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtX2lkIjoidjEzVjA3djAxRDExUjAzVjA3RDExbjAzSDE1djEzWTAwdjEzUjAzIiwiZGV2aWNlIjoidjEzVjA3djAxRDExUjAzVjA3bjAzUjAzZzE4VjA3QjE5ZzE4RDExIiwidl9vbiI6IjE2ODA5NjM5NTYyNTAiLCJ2X3RocnUiOjE2ODM1NTU5NTYyNTEsImV4cCI6MTY4MzU1NTk1NiwiaWF0IjoxNjgwOTYzOTU2fQ.JbN5ofZHWk6RcdRwPwNeOhk45Mx4ZVDMTAbIFiX0Kpw';
            
            // If the token is present, set the authorization header
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
      
            return headers;
        },
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