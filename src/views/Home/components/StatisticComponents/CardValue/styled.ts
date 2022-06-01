import styled from 'styled-components'
import { Text } from '@crosswise/uikit'

export const StyledText = styled(Text)<{
  opacity?: string
}>`
  opacity: ${({ opacity }) => opacity};
`
