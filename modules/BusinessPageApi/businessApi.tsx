import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const businessApi = createApi({
    reducerPath:'businessApi',
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
        createBusiness:builder.mutation({
            query: (body:{b_name:string,b_email:string,b_phone:string,b_address:string,website:string}) => {
                return {
                    url:'/api/v1/create-business',
                    method:'post',
                    body,
                };
            }
        }),
    })
});

export const { useCreateBusinessMutation } = businessApi