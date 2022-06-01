import styled from 'styled-components'

export const ButtonNav = styled.div`
  flex: none;
`

export const TabNav = styled.div`
  flex: 1;
  text-align: center;
`

export const StyledMobileMenu = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.card.background};
  display: flex;
  flex: none;
  height: 64px;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`
