import styled from 'styled-components'
import { Box } from '@crosswise/uikit'
import Container from '../Layout/Container'

export const Outer = styled(Box)<{ background?: string }>`
  background: ${({ theme, background }) => background || theme.colors.gradients.bubblegum};
`

export const Inner = styled(Container)`
  padding-top: 32px;
  padding-bottom: 32px;
`
