import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: 100%;
`

export const StyledImage = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  transition: opacity 1s linear;
  height: 100%;
  object-fit: cover;
  border-radius: 24px 24px 0 0;
`

export const StyledVideo = styled.video`
  height: 100%;
  width: 100%;
`
