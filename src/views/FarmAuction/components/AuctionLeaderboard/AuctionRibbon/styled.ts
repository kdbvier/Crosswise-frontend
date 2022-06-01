import styled from 'styled-components'

export const StyledRibbon = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  background-color: ${({ theme, color }) => theme.colors[color]};
  color: white;
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
  width: 94px;
  height: 94px;
  clip-path: polygon(0 0, 40% 0, 100% 60%, 100% 100%);

  & > div {
    padding-top: 23%;
    overflow: hidden;
    transform: rotate(45deg);
  }
`
