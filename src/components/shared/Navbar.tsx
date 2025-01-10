import Button from '@components/shared/Button'
import Flex from '@components/shared/Flex'
import { css } from '@emotion/react'
import { colors } from '@styles/colorPalette'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()

  const showSigninButton = ['/auth/signin'].includes(router.pathname) === false

  const renderButton = useCallback(() => {
    if (session != null) {
      return (
        <Link href="/my">
          <Image
            src={session.user?.image ?? ''}
            width={40}
            height={40}
            alt="유저 이미지"
          />
        </Link>
      )
    }

    if (showSigninButton) {
      return (
        <Link href="/auth/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [session, showSigninButton])

  return (
    <Flex justify="space-between" align="center" css={navbarStyles}>
      <Link href="/">MyAccount</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray100};
`

export default Navbar
