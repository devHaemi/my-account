import Button from '@components/shared/Button'
import Flex from '@components/shared/Flex'
import withAuth from '@hooks/withAuth'
import Spacing from '@components/shared/Spacing'
import { signOut } from 'next-auth/react'

function MyPage() {
  return (
    <div>
      <Spacing size={100} />
      <Flex>
        <Button onClick={() => signOut({ callbackUrl: '/' })}>로그아웃</Button>
      </Flex>
    </div>
  )
}

export default withAuth(MyPage)
