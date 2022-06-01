import styled from 'styled-components'
import { Card, Flex } from '@crosswise/uikit'

// Auction leader board table
export const LeaderboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 3fr 1fr;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 3fr 5fr 5fr 1fr;
  }
`

export const GridCell = styled(Flex)<{ isTopPosition: boolean }>`
  height: 65px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};

  ${({ theme, isTopPosition }) => isTopPosition && `background-color: ${theme.colors.warning}2D;`}
`
