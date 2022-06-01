import styled, { css } from 'styled-components'
import { Text } from '@crosswise/uikit'

export const Texter = styled(Text)<{ color?: string; fSize?: string }>`
  line-height: normal;
  ${(props) =>
    props.fSize &&
    css`
      font-size: ${props.fSize};
    `}

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`

export const TextBox = styled(Texter)<{ color?: string; fSize?: string }>`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const ThemeText = styled(Texter)<{ isDarkTheme: boolean; colors: Array<string> }>`
  color: ${(props) => (props.isDarkTheme ? props.colors[0] : props.colors[1])};
`

export const GradientTexter = styled(Texter)<{ colors: Array<string> }>`
  background: linear-gradient(270deg, ${(props) => props.colors[0]} 5.49%, ${(props) => props.colors[1]} 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`
