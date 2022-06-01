import { Box, Flex } from '@crosswise/uikit'
import styled from 'styled-components'

export const StyledBet = styled(Flex).attrs({ alignItems: 'center', p: '16px' })`
  background-color: ${({ theme }) => theme.card.background};
  border-bottom: 2px solid ${({ theme }) => theme.colors.cardBorder};
  cursor: pointer;
`

export const YourResult = styled(Box)`
  flex: 1;
`
