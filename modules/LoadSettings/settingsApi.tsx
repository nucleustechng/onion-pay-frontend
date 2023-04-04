import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const settingsApi = createApi({
    reducerPath:'settingsApi',
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
        })
    })
});

export const { useLoadSettingsQuery } = settingsApi