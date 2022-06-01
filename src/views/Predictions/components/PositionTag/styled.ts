import { ReactNode } from 'react'
import styled from 'styled-components'
import { Flex, FlexProps } from '@crosswise/uikit'

interface TagProps extends FlexProps {
  bg?: string
  startIcon?: ReactNode
}

export const StyledTag = styled(Flex)<{ bg: TagProps['bg'] }>`
  background-color: ${({ bg, theme }) => theme.colors[bg]};
  display: inline-flex;
`
