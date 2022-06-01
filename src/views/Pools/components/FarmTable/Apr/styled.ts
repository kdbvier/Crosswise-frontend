import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

export const AprWrapper = styled.div`
  min-width: 60px;
  /* text-align: left; */
  /* text-align: center; */
  font-size: 16px;
  color: ${({ theme }) => (theme.isDark ? '#fff' : '#060514')};
`
