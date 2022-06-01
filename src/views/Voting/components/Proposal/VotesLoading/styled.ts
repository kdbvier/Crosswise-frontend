import { Flex, Skeleton } from '@crosswise/uikit'
import styled from 'styled-components'

export const Row = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 16px 24px;
`

export const StyledSkeleton = styled(Skeleton)`
  flex: 1;
`
