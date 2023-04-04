import { configureStore } from '@reduxjs/toolkit'
import { generateApiKeys } from '../modules/ApiKeys/generateApiKeys'
import { AuthApi } from '../modules/auth/api/AuthApi'
import { businessApi } from '../modules/BusinessPageApi/businessApi'
import { invoiceApi } from '../modules/Invoices/invoiceApi'
import { settingsApi } from '../modules/LoadSettings/settingsApi'
import { paymentPageApi } from '../modules/PaymentPageApi/paymentPageApi'
import invoiceSlice from './invoiceSlice'
import loginSlice from './loginSlice'
import createBusinessSlice from './Modal-Processes/createBusinessSlice'
import paymentLinkSlice from './Modal-Processes/paymentLinkSlice'
import paymentSlice from './Modal-Processes/paymentSlice'
import sidebarSlice from './sidebarSlice'
// import { seerbitApi } from '../components/Checkout/SeerbitPayment'

// ...

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]:AuthApi.reducer,
    payment:paymentSlice,
    business:createBusinessSlice,
    paymentLink:paymentLinkSlice,
    sidebar:sidebarSlice,
    login:loginSlice,
    invoice:invoiceSlice,
    // [seerbitApi.reducerPath]:seerbitApi.reducer,
    [businessApi.reducerPath]:businessApi.reducer,
    [paymentPageApi.reducerPath]:paymentPageApi.reducer,
    [generateApiKeys.reducerPath]:generateApiKeys.reducer,
    [settingsApi.reducerPath]:settingsApi.reducer,
    [invoiceApi.reducerPath]:invoiceApi.reducer
  },
  middleware:(getDefaultMiddleware) =>  getDefaultMiddleware().concat(AuthApi.middleware,
  businessApi.middleware,paymentPageApi.middleware,generateApiKeys.middleware, settingsApi.middleware,invoiceApi.middleware)
  
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch