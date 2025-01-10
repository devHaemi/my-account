import { Global } from '@emotion/react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'

import type { AppProps } from 'next/app'
import globalStyles from '@styles/globalStyles'
import Layout from '@shared/Layout'
import AuthGuard from '@components/auth/AuthGuard'
import Navbar from '@components/shared/Navbar'

const client = new QueryClient({})

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <QueryClientProvider client={client}>
        <Global styles={globalStyles} />
        <SessionProvider session={session}>
          <Hydrate state={dehydratedState}>
            <AuthGuard>
              <Navbar />
              <Component {...pageProps} />
            </AuthGuard>
          </Hydrate>
        </SessionProvider>
      </QueryClientProvider>
    </Layout>
  )
}
