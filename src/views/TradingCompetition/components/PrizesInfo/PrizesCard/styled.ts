import styled from 'styled-components'
import { Card } from '@crosswise/uikit'

export const StyledCard = styled(Card)`
  ${({ theme }) => theme.mediaQueries.md} {
    margin-right: 40px;
    flex: 1;
  }
`
