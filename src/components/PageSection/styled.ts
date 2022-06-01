import styled from 'styled-components'
import { Flex } from '@crosswise/uikit'
import Container from 'components/Layout/Container'
import { WrapperProps, BackgroundColorProps } from './interfaces'

export const Wrapper = styled.div<WrapperProps>`
  background: ${({ theme, dividerFill }) => {
    if (theme.isDark) {
      return dividerFill?.dark || dividerFill?.light || 'none'
    }
    return dividerFill?.light || dividerFill?.dark || 'none'
  }};
  z-index: ${({ index }) => index};
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`

export const ComponentWrapper = styled.div<WrapperProps>`
  z-index: ${({ index }) => index + 1};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const BackgroundColor = styled(Flex)<BackgroundColorProps>`
  position: relative;
  flex-direction: column;
  align-items: center;
  z-index: ${({ index }) => index - 1};
  background: ${({ background, theme }) => background || theme.colors.background};
  padding: ${({ getPadding }) => getPadding()};
`

export const ChildrenWrapper = styled(Container)`
  min-height: auto;
  padding-top: 16px;
  padding-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 32px;
    padding-bottom: 32px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 48px;
    padding-bottom: 48px;
  }
`
