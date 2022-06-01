import { Flex } from '@crosswise/uikit'
import styled from 'styled-components'

export const StyledFilters = styled(Flex).attrs({ alignItems: 'center' })`
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 16px 24px;
`

export const FilterLabel = styled.label`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-right: 16px;
`
