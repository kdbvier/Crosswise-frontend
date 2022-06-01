import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const StyledProposalRow = styled(Link)`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  display: flex;
  padding: 16px 24px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dropdown};
  }
`
