import styled from 'styled-components'
import { Card, Link } from '@crosswise/uikit'

export const StyledCard = styled(Card)`
  flex: 1;
  height: fit-content;
`

export const InlineLink = styled(Link)`
  display: inline;
`

export const List = styled.ul`
  list-style-position: outside;
  padding: 0 24px;

  li {
    line-height: 1.5;
    margin-bottom: 4px;
  }

  li::marker {
    font-size: 12px;
  }
`

export const FaqLi = styled.li`
  color: ${({ theme }) => theme.colors.textSubtle};
`
