import { Flex } from '@crosswise/uikit'
import styled from 'styled-components'

export const TeamRankTextWrapper = styled(Flex)`
  align-items: center;
  justify-content: center;
  svg {
    width: 24px;
  }
`

export const RanksWrapper = styled(Flex)`
  width: 100%;
  margin-top: 24px;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`
