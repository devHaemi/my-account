import { useRouter } from 'next/router'

import useCards from '@components/home/hooks/useCards'
import Badge from '@components/shared/Badge'
import Button from '@components/shared/Button'
import withSuspense from '@hooks/withSuspense'
import ListRow from '@components/shared/ListRow'
import Skeleton from '@components/shared/Skeleton'
import Text from '@components/shared/Text'

function CardList() {
  const { data: cards } = useCards()
  const navigate = useRouter()

  const isShowMoreButton = cards?.items.length ?? 0 > 5

  return (
    <div>
      <Text
        bold={true}
        style={{ padding: '12px 24px', display: 'inline-block' }}
      >
        추천 카드
      </Text>
      <ul>
        {cards?.items.slice(0, 5).map((card, index) => (
          <ListRow
            key={card.id}
            contents={
              <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
            }
            right={card.payback != null ? <Badge label={card.payback} /> : null}
            withArrow={true}
            onClick={() => {
              navigate.push(`/card/${card.id}`)
            }}
          />
        ))}
      </ul>
      {isShowMoreButton ? (
        <div style={{ padding: '12px 24px 0 24px' }}>
          <Button
            full={true}
            weak={true}
            size="medium"
            onClick={() => {
              navigate.push('/card')
            }}
          >
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export function CardListSkeleton() {
  return (
    <div>
      <Text
        bold={true}
        style={{ padding: '12px 24px', display: 'inline-block' }}
      >
        추천 카드
      </Text>
      {[...new Array(5)].map((_, index) => (
        <ListRow
          key={index}
          contents={
            <ListRow.Texts
              title={<Skeleton width={30} height={25} />}
              subTitle={<Skeleton width={45} height={20} />}
            />
          }
        />
      ))}
    </div>
  )
}

export default withSuspense(CardList, { fallback: <CardListSkeleton /> })
