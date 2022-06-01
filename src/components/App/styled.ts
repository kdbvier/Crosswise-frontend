import styled from 'styled-components'
import { Card, Flex } from '@crosswise/uikit'

export const AppHeaderContainer = styled(Flex)<{ hideBorder: boolean }>`
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  width: 100%;
  border-bottom: ${({ hideBorder }) => (hideBorder ? 'none' : '1px')} solid ${({ theme }) => theme.colors.cardBorder};
`

export const BodyWrapper = styled(Card)`
  border-radius: 12px;
  /* max-width: 436px; */
  width: 100%;
  z-index: 1;
`
