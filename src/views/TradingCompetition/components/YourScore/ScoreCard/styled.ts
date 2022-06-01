import styled from 'styled-components'
import { Card, CardFooter, Button } from '@crosswise/uikit'

export const StyledCard = styled(Card)`
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 380px;
  }
`

export const StyledCardFooter = styled(CardFooter)`
  background: ${({ theme }) => theme.card.cardHeaderBackground.default};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 32px;
    width: auto;
    fill: ${({ theme }) => theme.colors.warning};
  }
`

export const StyledButton = styled(Button)`
  svg {
    margin-right: 4px;
    height: 20px;
    width: auto;
    fill: ${({ theme }) => theme.colors.textDisabled};
  }
`
