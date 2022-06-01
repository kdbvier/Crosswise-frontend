import styled from 'styled-components'
import { Flex } from '@crosswise/uikit'

export const Wrapper = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 18px;
    padding-right: 18px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 24px;
    padding-right: 24px;
  }
`
