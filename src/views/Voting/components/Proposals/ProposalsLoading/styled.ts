import { Flex } from '@crosswise/uikit'
import styled from 'styled-components'

export const Row = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

export const Wrapper = styled.div`
  ${Row}:last-child {
    border-bottom: 0;
  }
`
