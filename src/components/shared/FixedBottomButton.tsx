import Button from '@/components/shared/Button'
import { colors } from '@/styles/colorPalette'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { createPortal } from 'react-dom'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

function FixedBottomButton({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) {
  const $root_portal = document.getElementById('root-portal')

  if ($root_portal == null) {
    return null
  }

  return createPortal(
    <Container>
      <Button
        size="medium"
        full={true}
        css={buttonStyles}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </Button>
    </Container>,
    $root_portal,
  )
}

const slideUp = keyframes`
  to {
    transform: translateY(0);
  }
`

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px 10px 8px;
  background-color: ${colors.white};
  transform: translateY(100%);
  animation: ${slideUp} 0.5s ease-in-out forwards;
`
const buttonStyles = css`
  border-radius: 8px;
`

export default FixedBottomButton
