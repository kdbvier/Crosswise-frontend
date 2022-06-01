import styled from 'styled-components'

export const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  margin-top: ${({ show }) => (show ? '36px' : 0)};
  width: 100%;
  /* max-width: 400px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.invertedContrast}; */

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  display: ${({ show }) => (show ? 'auto' : 'none')};
  transition: transform 300ms ease-in-out;
`
