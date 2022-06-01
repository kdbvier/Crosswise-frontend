import { Text } from '@crosswise/uikit'
import styled from 'styled-components'

export const Description = styled(Text).attrs({ as: 'p', fontSize: '14px' })`
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`
