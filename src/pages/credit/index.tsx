import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import CreditScoreChart from '@components/shared/CreditScoreChart'
import Flex from '@components/shared/Flex'
import ListRow from '@components/shared/ListRow'
import Spacing from '@components/shared/Spacing'
import Text from '@components/shared/Text'
import useUser from '@hooks/useUser'
import { useAlertContext } from '@contexts/AlertContext'

const FixedBottomButton = dynamic(
  () => import('@components/shared/FixedBottomButton'),
  {
    ssr: false,
  },
)

function CreditPage() {
  const isSearchCreditScore = true
  const user = useUser()
  const { open } = useAlertContext()
  const router = useRouter()

  const handleCheck = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요한 기능입니다',
        description:
          '정확한 신용정보를 확인하기 위해 로그인을 먼저 진행해주세요',
        onButtonClick: () => {
          router.push('/auth/signin')
        },
      })

      return
    }

    router.push('/credit/check')
  }, [router, open, user])

  return isSearchCreditScore ? (
    <div>
      <Spacing size={40} />
      <Flex direction="column" align="center">
        <Text typography="t4" bold={true} textAlign="center">
          나의 신용점수
        </Text>
        <Spacing size={10} />
        {/* TODO 실제 신용점수 */}
        <CreditScoreChart score={0} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          contents={
            <ListRow.Texts
              title="추천카드"
              subTitle="나에게 맞는 카드 찾아보기"
            />
          }
          withArrow={true}
          onClick={() => {
            router.push('/card')
          }}
        />
      </ul>
      <FixedBottomButton label="신용점수 올리기" onClick={handleCheck} />
    </div>
  ) : (
    <div>
      <Spacing size={40} />
      <Flex direction="column" align="center">
        <Text typography="t4" bold={true} textAlign="center">
          내 신용점수를
          <br />
          조회하고 관리해보세요
        </Text>
        <Spacing size={10} />
        <CreditScoreChart score={0} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          contents={
            <ListRow.Texts
              title="정확한 신용평점"
              subTitle="대표 기관의 데이터로 관리해요"
            />
          }
        />
        <ListRow
          contents={
            <ListRow.Texts
              title="신용점수 무료조회"
              subTitle="신용점수에 영향없이 무료로 조회가 가능해요"
            />
          }
        />
      </ul>

      <FixedBottomButton
        label="30초만에 신용점수 조회하기"
        onClick={handleCheck}
      />
    </div>
  )
}

export default CreditPage
