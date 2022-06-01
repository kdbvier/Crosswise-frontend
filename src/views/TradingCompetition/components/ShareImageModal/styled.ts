import { Button, Text } from '@crosswise/uikit'
import styled from 'styled-components'

export const StyledCanvas = styled.canvas`
  width: 100%;
`

export const StyledButton = styled(Button)`
  display: none;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`

export const MobileText = styled(Text)`
  display: block;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`
