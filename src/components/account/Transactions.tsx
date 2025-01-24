import useTransactions from '@components/account/hooks/useTransactions'
import Button from '@components/shared/Button'
import Flex from '@components/shared/Flex'
import ListRow from '@components/shared/ListRow'
import Text from '@components/shared/Text'
import withSuspense from '@hooks/withSuspense'
import addDelimiter from '@utils/addDelimiter'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'

function Transactions() {
  const { data } = useTransactions({ suspense: true })

  const transactions = data?.pages
    .map(({ items }) => items)
    .flat()
    .slice(0, 5)

  return (
    <div>
      <Text bold={true} style={{ padding: 24 }}>
        입출금 내역
      </Text>

      {transactions?.length === 0 ? (
        <Flex style={{ padding: 24 }}>
          <Text>입출금 내역이 없습니다.</Text>
        </Flex>
      ) : (
        <ul>
          {transactions?.map((transaction) => {
            const isDeposit = transaction.type === 'deposit'

            return (
              <ListRow
                key={transaction.id}
                contents={
                  <ListRow.Texts
                    title={transaction.displayText}
                    subTitle={format(
                      parseISO(transaction.date),
                      'yyyy-MM-dd HH:mm:SS',
                    )}
                  />
                }
                right={
                  <Flex direction="column" align="flex-end">
                    <Text color={isDeposit ? 'blue' : 'red'} bold={true}>
                      {isDeposit ? '+' : '-'} {addDelimiter(transaction.amount)}
                      원
                    </Text>
                    <Text>{addDelimiter(transaction.balance)}원</Text>
                  </Flex>
                }
              />
            )
          })}
        </ul>
      )}
      <Link href="/account/transactions">
        <Button full={true} size="medium" weak={true}>
          자세히 보기
        </Button>
      </Link>
    </div>
  )
}

export default withSuspense(Transactions, { fallback: <div>Loading...</div> })
