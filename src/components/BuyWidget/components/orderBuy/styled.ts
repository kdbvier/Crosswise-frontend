import styled from 'styled-components'
import { Text } from '@crosswise/uikit'

export const Label = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
`
