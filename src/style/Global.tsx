import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { CrosswiseTheme } from '@crosswise/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends CrosswiseTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
    transition: all 0.5s;
    transition-property: background, background-color, color;
  }
  body {
    /* background-color: ${({ theme }) => theme.colors.background}; */
    background-color: ${({ theme }) => (theme.isDark ? '#060514' : '#fff')};

    img {
      height: auto;
      max-width: 100%;
    }
    ::-webkit-scrollbar-thumb {
      background: rgb(129, 142, 163);
      border-radius: 8px;
  }
  }
`

export default GlobalStyle
