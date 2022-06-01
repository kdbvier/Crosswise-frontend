import styled, { keyframes } from 'styled-components'
import Page from '../Layout/Page'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const StyledSVG = styled.svg<{ size: string; stroke?: string }>`
  animation: 2s ${rotate} linear infinite;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  path {
    stroke: ${({ stroke, theme }) => stroke ?? theme.colors.primary};
  }
`

export const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`
