import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Layout from "../layout/Layout";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();

	return (
		<>
			<Head>
				<title>Onion Pay - Swift Payments for Every Business</title>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</QueryClientProvider>
			</Provider>
		</>
	);
}
