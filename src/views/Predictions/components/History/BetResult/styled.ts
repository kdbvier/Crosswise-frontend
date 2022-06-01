import { Box } from '@crosswise/uikit'
import styled from 'styled-components'

export const StyledBetResult = styled(Box)`
  border: 2px solid ${({ theme }) => theme.colors.textDisabled};
  border-radius: 16px;
  margin-bottom: 24px;
  padding: 16px;
`

export const Divider = styled.hr`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
`
