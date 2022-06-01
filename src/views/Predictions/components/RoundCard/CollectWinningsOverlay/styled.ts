import styled from 'styled-components'
import { Flex } from '@crosswise/uikit'

interface CollectWinningsOverlayProps {
  epoch: number
  payout: string
  betAmount: string
  isBottom?: boolean
}

export const Wrapper = styled(Flex)<{ isBottom: CollectWinningsOverlayProps['isBottom'] }>`
  background-color: ${({ theme }) => theme.colors.secondary};
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 30;

  ${({ isBottom }) => {
    return isBottom
      ? `
      border-radius: 0 0 16px 16px;
      bottom: 0;
    `
      : `
      top: 37px; // Card header height
    `
  }}
`
