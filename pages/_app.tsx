import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import Layout from '../layout/Layout'
import Head from 'next/head'


export default function App({ Component, pageProps }: AppProps) {

  
  return  <>
       <Head>
        <title>Onion Pay - Swift Payments for Every Business</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    </>
}
