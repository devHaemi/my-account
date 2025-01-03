import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import globalStyles from '@styles/globalStyles'
import Layout from '@shared/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'

const client = new QueryClient({})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <QueryClientProvider client={client}>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </Layout>
  )
}
