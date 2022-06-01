import styled from 'styled-components'

export const ExpandedWrapper = styled.div`
  /* Between 576 - 852px - the expanded wrapper shows as a three-column grid */
  ${({ theme }) => theme.mediaQueries.sm} {
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-auto-flow: column;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }

  /* Above 1080px - it should again show as a three-column grid */
  ${({ theme }) => theme.mediaQueries.xl} {
    display: grid;
  }
`
