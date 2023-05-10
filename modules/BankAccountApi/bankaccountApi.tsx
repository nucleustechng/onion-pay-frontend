import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';


export const bankaccountApi = createApi({
    reducerPath:'bankaccountApi',
    tagTypes:["banks"],
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
        updateBankAccountDetails:builder.mutation({
            query: (body:{account_number:string,bank:string,settle_to_bank:boolean}) => {
                return {
                    url:'/api/v1/update-bank-account',
                    method:'post',
                    body,
                };
            }
        }),
        loadBanks:builder.query<any,void>({
            query:() => '/api/v1/banks',
        })
    })
});

export const { useLoadBanksQuery, useUpdateBankAccountDetailsMutation } = bankaccountApi