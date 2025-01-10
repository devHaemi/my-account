import { Global } from '@emotion/react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'

import type { AppProps } from 'next/app'
import globalStyles from '@styles/globalStyles'
import Layout from '@shared/Layout'

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
            <Component {...pageProps} />
          </Hydrate>
        </SessionProvider>
      </QueryClientProvider>
    </Layout>
  )
}
