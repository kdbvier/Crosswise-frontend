import { Text, Flex, Box } from '@crosswise/uikit'
import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textDisabled};
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 4fr auto;

  /* Between 576 - 852px - the expanded wrapper shows as a three-column grid */
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-gap: 4px;
    grid-template-columns: auto 1fr auto;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-gap: 16px;
    grid-template-columns: 1fr 4fr auto;
  }

  /* Above 1080px - the expanded wrapper shows as a three-column grid. */
  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: auto 1fr;
    min-height: 44px;
  }

  svg {
    height: 44px;
    width: auto;
  }
`

export const VolumeAddressWrapper = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 2fr;

  /* Between 576 - 852px - the expanded wrapper shows as a three-column grid and these elements are stacked */
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    flex-direction: column;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    display: grid;
  }

  /* Above 1080px - the expanded wrapper shows as a three-column grid and these elements are stacked */
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
  }
`

export const VolumeText = styled(Text)`
  margin-right: 8px;

  /* Between 576 - 852px the expanded wrapper shows as a three-column grid */
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 0;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    margin-right: 16px;
  }

  /* Above 1080px - the expanded wrapper shows as a three-column grid */
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 0;
  }
`

export const TeamImageWrapper = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.xl} {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`
