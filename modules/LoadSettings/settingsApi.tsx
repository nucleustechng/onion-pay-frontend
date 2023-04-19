import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const settingsApi = createApi({
    reducerPath:'settingsApi',
    tagTypes:['Details'],
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
        loadSettings:builder.query<any,void>({
            query:() => '/api/v1/settings',
            providesTags:['Details']
        }),
        updateBusinessInfo:builder.mutation({
            query: (body:{email:string,phone:string,address:string,website:string,bvn:string}) => {
                return {
                    url:'/api/v1/update-business',
                    method:'post',
                    body,
                };
            },
            invalidatesTags: ['Details']
        }),
        updateBusinessLogo:builder.mutation({
            query:(body:{logo:string}) => {
                return {
                    url:'/api/v1/update-business-logo',
                    method:'post',
                    body
                }
            }
        })
    })
});

export const { useLoadSettingsQuery, useUpdateBusinessInfoMutation, useUpdateBusinessLogoMutation } = settingsApi