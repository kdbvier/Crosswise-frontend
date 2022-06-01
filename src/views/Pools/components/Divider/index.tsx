import styled from 'styled-components'

const lightBorderImage = `linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 5%,
      rgba(20, 1, 41, 0.4) 20%,
      rgba(20, 1, 41, 0.8),
      rgba(20, 1, 41, 1) 50%,
      rgba(20, 1, 41, 0.8),
      rgba(20, 1, 41, 0.4) 80%,
      rgba(255, 255, 255, 0) 95%
    )
    1 0 0;`
const darkBorderImage = `linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 5%,
      rgba(207, 179, 236, 0.4) 20%,
      rgba(207, 179, 236, 0.8),
      rgba(207, 179, 236, 1) 50%,
      rgba(207, 179, 236, 0.8),
      rgba(207, 179, 236, 0.4) 80%,
      rgba(255, 255, 255, 0) 95%
    )
    1 0 0;`

export default styled.div<{ height?: number }>`
  /* background-color: ${({ theme }) => theme.colors.textSubtle}; */
  /* height: 1px; */
  border: solid 1px;
  border-image: ${({ theme }) => (theme.isDark ? darkBorderImage : lightBorderImage)};
  margin: auto;
  margin-top: ${({ height }) => Math.floor(height / 2) - 1 || 15}px;
  margin-bottom: ${({ height }) => Math.ceil(height / 2) - 1 || 15}px;
  width: 100%;
`
