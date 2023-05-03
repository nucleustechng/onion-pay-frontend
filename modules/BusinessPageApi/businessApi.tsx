import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const businessApi = createApi({
    reducerPath:'businessApi',
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
        createBusiness:builder.mutation({
            query: (body:{b_name:string,b_email:string,b_phone:string,b_address:string,website:string}) => {
                return {
                    url:'/api/v1/create-business',
                    method:'post',
                    body,
                };
            }
        }),
        authorizeBusiness:builder.mutation({
            query:(formData: FormData) => {
                return {
                    url:'/api/v1/authorise-business',
                    method: 'POST',
                    body: formData,
                }
            }
        })
     
    })
});

export const { useCreateBusinessMutation, useAuthorizeBusinessMutation } = businessApi