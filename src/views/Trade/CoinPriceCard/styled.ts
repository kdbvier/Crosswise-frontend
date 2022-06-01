import styled from 'styled-components'
import { Text, Flex } from '@crosswise/uikit'

export const CardHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #c4c4c416;
  padding: 1rem 2rem;

  @media (max-width: 800px) {
    padding: 1rem 1rem;
  }
`

export const CardBody = styled.div`
  width: 100%;
  padding: 1rem 2rem;

  @media (max-width: 800px) {
    padding: 1rem 1rem;
  }
`

export const ClickableColumnHeader = styled(Text)`
  display: flex;
  align-items: center;
  letter-spacing: 0.04em;
  text-transform: capitalize;
  padding: 0.5rem 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primaryGray};
`

export const TableWrapper = styled(Flex)`
  width: 100%;
  flex-direction: column;
  gap: 16px;
`

export const PageButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2em;
  margin-bottom: 1.2em;
`

export const Arrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 20px;
  :hover {
    cursor: pointer;
  }
`

export const Break = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.cardBorder};
  width: 100%;
`
