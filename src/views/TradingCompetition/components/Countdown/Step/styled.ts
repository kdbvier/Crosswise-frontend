import styled from 'styled-components'
import { Flex, Text } from '@crosswise/uikit'

const sharedFlexStyles = `
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ExpiredWrapper = styled(Flex)`
  ${sharedFlexStyles}

  svg {
    fill: ${({ theme }) => theme.colors.textSubtle};
  }
`

export const ActiveWrapper = styled(Flex)`
  ${sharedFlexStyles}
`

export const FutureWrapper = styled(Flex)`
  ${sharedFlexStyles}

  svg {
    fill: ${({ theme }) => theme.colors.textDisabled};
  }
`

export const StyledText = styled(Text)`
  margin-top: 4px;
  font-weight: 600;
  font-size: 12px;
`
