import styled, { css, DefaultTheme } from 'styled-components'
import { Box } from '@crosswise/uikit'
import { ClipFill } from '../types'
import { ContainerProps } from './interfaces'

const sharedStyles = (theme: DefaultTheme, clipPath: string, clipFill?: ClipFill) => css`
  width: 100%;
  height: 20px;
  clip-path: url(${clipPath});

  background: ${() => {
    if (theme.isDark) {
      return clipFill?.dark || clipFill?.light || theme.colors.background
    }
    return clipFill?.light || theme.colors.background
  }};

  & svg {
    display: block;
  }
`

export const ConcaveContainer = styled(Box)<ContainerProps>`
  ${({ theme, clipPath, clipFill }) => sharedStyles(theme, clipPath, clipFill)}
  transform: ${({ clipPath }) => (clipPath === '#bottomConcaveCurve' ? 'translate(0, -13px)' : 'translate(0, 1px)')};
`

export const ConvexContainer = styled(Box)<ContainerProps>`
  ${({ theme, clipPath, clipFill }) => sharedStyles(theme, clipPath, clipFill)}
  transform: ${({ clipPath }) => (clipPath === '#bottomConvexCurve' ? 'translate(0, -13px)' : 'translate(0, -1px)')};
`
