import styled from 'styled-components'
import { Text } from '@crosswise/uikit'

export const StyleButton = styled(Text).attrs({ role: 'button' })`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.75rem 1rem 0.75rem 1rem;
  cursor: pointer;
`
