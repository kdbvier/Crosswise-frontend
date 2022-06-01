import styled from 'styled-components'
import { Flex, FlexProps } from '@crosswise/uikit'

export const Wrapper = styled(Flex)`
  background: ${({ theme }) => theme.card.cardHeaderBackground.default};
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 8px;
  margin-top: 8px;

  ${({ theme }) => theme.mediaQueries.xs} {
    padding: 8px 24px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0;
  }
`

export const MedalsWrapper = styled(Flex)`
  align-items: center;
  justify-content: center;

  svg {
    width: 40px;
  }
`

export const ArrowWrapper = styled(Flex)`
  svg {
    height: 10px;
    width: 10px;
    fill: ${({ theme }) => theme.colors.textSubtle};
  }
`
