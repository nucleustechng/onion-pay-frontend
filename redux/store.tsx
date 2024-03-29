import { configureStore } from "@reduxjs/toolkit";
import { generateApiKeys } from "../modules/ApiKeys/generateApiKeys";
import { AuthApi } from "../modules/auth/api/AuthApi";
import { bankaccountApi } from "../modules/BankAccountApi/bankaccountApi";
import { businessApi } from "../modules/BusinessPageApi/businessApi";
import { usersApi } from "../modules/Client/usersApi";
import { retrieveLinkApi } from "../modules/Developers/retrieveLinkApi";
import { switchEnvironment } from "../modules/Environment/switchEnvironment";
import { invoiceApi } from "../modules/Invoices/invoiceApi";
import { settingsApi } from "../modules/LoadSettings/settingsApi";
import { paymentPageApi } from "../modules/PaymentPageApi/paymentPageApi";
import { passwordApi } from "../modules/ResetPassword/passwordApi";
import { transationsApi } from "../modules/TransactionsApi/transactionsApi";
import { paymentPages } from "../modules/PaymentPages";
import invoiceSlice from "./invoiceSlice";
import loginSlice from "./loginSlice";
import createBusinessSlice from "./Modal-Processes/createBusinessSlice";
import paymentLinkSlice from "./Modal-Processes/paymentLinkSlice";
import paymentSlice from "./Modal-Processes/paymentSlice";
import passwordResetSlice from "./passwordResetSlice";
import sidebarSlice from "./sidebarSlice";
import { walletApi } from "../modules/WalletApi";
import { singleInvoiceApi } from "../modules/InvoicesApi";
import { updatewebhookApi } from "../modules/Webhook/webhookApi";
// import { seerbitApi } from '../components/Checkout/SeerbitPayment'

// ...

export const store = configureStore({
	reducer: {
		payment: paymentSlice,
		business: createBusinessSlice,
		paymentLink: paymentLinkSlice,
		sidebar: sidebarSlice,
		login: loginSlice,
		invoice: invoiceSlice,
		email: passwordResetSlice,
		// [seerbitApi.reducerPath]:seerbitApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[businessApi.reducerPath]: businessApi.reducer,
		[paymentPageApi.reducerPath]: paymentPageApi.reducer,
		[paymentPages.reducerPath]: paymentPages.reducer,
		[walletApi.reducerPath]: walletApi.reducer,
		[generateApiKeys.reducerPath]: generateApiKeys.reducer,
		[settingsApi.reducerPath]: settingsApi.reducer,
		[invoiceApi.reducerPath]: invoiceApi.reducer,
		[AuthApi.reducerPath]: AuthApi.reducer,
		[passwordApi.reducerPath]: passwordApi.reducer,
		[retrieveLinkApi.reducerPath]: retrieveLinkApi.reducer,
		[transationsApi.reducerPath]: transationsApi.reducer,
		[bankaccountApi.reducerPath]: bankaccountApi.reducer,
		[switchEnvironment.reducerPath]: switchEnvironment.reducer,
		[singleInvoiceApi.reducerPath]: singleInvoiceApi.reducer,
		[updatewebhookApi.reducerPath]: updatewebhookApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			AuthApi.middleware,
			passwordApi.middleware,
			businessApi.middleware,
			paymentPageApi.middleware,
			generateApiKeys.middleware,
			settingsApi.middleware,
			paymentPages.middleware,
			invoiceApi.middleware,
			usersApi.middleware,
			retrieveLinkApi.middleware,
			transationsApi.middleware,
			switchEnvironment.middleware,
			bankaccountApi.middleware,
			walletApi.middleware,
			singleInvoiceApi.middleware,
			updatewebhookApi.middleware
		),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
