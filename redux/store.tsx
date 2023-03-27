import { configureStore } from '@reduxjs/toolkit'
import { AuthApi } from '../modules/auth/api/AuthApi'
import { businessApi } from '../modules/BusinessPageApi/businessApi'
import { paymentPageApi } from '../modules/PaymentPageApi/paymentPageApi'
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
    // [seerbitApi.reducerPath]:seerbitApi.reducer,
    [businessApi.reducerPath]:businessApi.reducer,
    [paymentPageApi.reducerPath]:paymentPageApi.reducer
  },
  middleware:(getDefaultMiddleware) =>  getDefaultMiddleware().concat(AuthApi.middleware,businessApi.middleware,paymentPageApi.middleware )
  
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch