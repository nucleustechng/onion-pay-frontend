import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const seerbitApi = createApi({
    reducerPath:'seerbitApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://seerbitapi.com/api/v2',
    }),
    endpoints: (builder) => ({
        seerbitPay:builder.mutation({
            query: (body:{public_key:string,full_name:string,email:string,
              currency:string,country:string,amount:string,tokenize:boolean,
              setAmountByCustomer:boolean,callbackurl:string,tranref:any}) => {
                return {
                    url:'/payments',
                    method:'post',
                    body,
                };
            }
        }),
        // getBanks:builder.query({
        //   query:() => `/banks/merchant/SBTESTPUBK_p8GqvFSFNCBahSJinczKd9aIPoRUZfda`
        // })
        
    })
});

export const { useSeerbitPayMutation } = seerbitApi