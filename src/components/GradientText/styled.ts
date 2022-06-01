import styled, { css } from 'styled-components'

export const GradientTextContainer = styled.div<{ gradient?: string; fontSize?: string; fontWeight?: string }>`
  ${({ gradient, fontSize, fontWeight }) => css`
    font-size: ${fontSize || '21px'};
    background: ${gradient || 'linear-gradient(270deg, #8c39ff 0%, #218bff 100%)'};
    font-weight: ${fontWeight || 'normal'};
  `}

  line-height: 20px;
  text-align: center;
  height: 20px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
