import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { css } from '@emotion/react'

import Flex from '@components/shared/Flex'
import Text from '@components/shared/Text'
import { Event } from '@models/event'
import { typographyMap } from '@styles/typography'
import Button from '@components/shared/Button'

const FixedBottomButton = dynamic(
  () => import('@components/shared/FixedBottomButton'),
  {
    ssr: false,
  },
)

function Preview({ data, mode }: { data: Event; mode: 'preview' | 'edit' }) {
  const router = useRouter()
  const { title, subTitle, buttonLabel, link, contents } = data

  return (
    <Flex direction="column">
      <Flex direction="column" style={{ padding: '12px 24px' }}>
        <Text bold={true}>{title}</Text>
        <Text typography="t6">{subTitle}</Text>
      </Flex>

      <div css={markdownStyles}>
        <ReactMarkdown>{contents}</ReactMarkdown>
      </div>

      {mode === 'preview' ? (
        <FixedBottomButton
          label={buttonLabel}
          onClick={() => {
            router.push(link)
          }}
        />
      ) : (
        <Button>{buttonLabel}</Button>
      )}
    </Flex>
  )
}

const markdownStyles = css`
  padding: 24px;
  ${typographyMap.t6}

  h1 {
    ${typographyMap.t3}
    font-weight: bold;
    margin: 24px;
  }

  h2 {
    ${typographyMap.t4}
    font-weight: bold;
    margin: 18px;
  }

  ul {
    padding-inline-start: 20px;
    margin: 18px 0;
  }

  li {
    list-style-type: disc;
  }

  p {
    margin: 18px 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`

export default Preview
