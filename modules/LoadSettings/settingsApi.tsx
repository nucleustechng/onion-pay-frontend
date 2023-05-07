import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';


export const settingsApi = createApi({
    reducerPath:'settingsApi',
    tagTypes:['Details'],
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
        loadSettings:builder.query<any,void>({
            query:() => '/api/v1/settings',
            providesTags:['Details']
        }),
        updateBusinessInfo:builder.mutation({
            query: (body:{name:string,email:string,phone:string,address:string,website:string,bvn:string}) => {
                return {
                    url:'/api/v1/update-business',
                    method:'post',
                    body,
                };
            },
            invalidatesTags: ['Details']
        }),
        updateAccountDetails:builder.mutation({
            query: (body:{ f_name:string,l_name:string,o_name:string
                email:string,phone:string,address:string,dob:string}) => {
                return {
                    url:'/api/v1/update-account-details',
                    method:'post',
                    body,
                };
            },
            invalidatesTags: ['Details']
        }),
        updateBusinessLogo:builder.mutation({
            query:(formData: FormData) => {
                return {
                    url:'/api/v1/update-business-logo',
                    method:'post',
                    body:formData
                }
            }
        })
    })
});

export const { useLoadSettingsQuery, useUpdateBusinessInfoMutation, useUpdateBusinessLogoMutation, useUpdateAccountDetailsMutation } = settingsApi