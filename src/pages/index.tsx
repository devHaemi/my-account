import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Skeleton from '@components/shared/Skeleton'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  ssr: false,
  loading: () => (
    <Skeleton width="100%" height={100} style={{ borderRadius: 8 }}>
      loading...
    </Skeleton>
  ),
})

export default function Home() {
  return (
    <Container>
      <EventBanners />
      <div css={bold}>Home</div>
    </Container>
  )
}

const Container = styled.div`
  background-color: pink;
`
const bold = css`
  font-weight: bold;
`
