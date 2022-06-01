import { Flex } from '@crosswise/uikit'
import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  display: grid;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textDisabled};
  grid-gap: 4px;

  svg {
    height: 55px;
    width: auto;
  }

  /* Between 0 - 370px the team image is absolutely positioned so it starts as a 3-column grid */
  grid-template-columns: repeat(3, auto);
  min-height: 55px;

  ${({ theme }) => theme.mediaQueries.xs} {
    grid-template-columns: auto repeat(3, 1fr);
    grid-gap: 8px;

    svg {
      height: 65px;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: auto repeat(3, 1fr);
    grid-gap: 16px;

    svg {
      height: 72px;
    }
  }

  /* Between 968 - 1080px the team image is absolute positioned so it returns to a 3-column grid */
  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: auto auto 1fr;
    min-height: 72px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const TeamImageWrapper = styled(Flex)`
  /* Between 0 - 370px the grid is narrow so absolute position the team image */
  position: absolute;
  right: 0;
  bottom: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    position: relative;
  }

  /* Between 968 - 1080px the grid is narrow so absolute position the team image */
  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    position: relative;
  }
`
