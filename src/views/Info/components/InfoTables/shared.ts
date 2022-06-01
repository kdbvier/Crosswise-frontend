import styled from 'styled-components'
import { Text, Flex, Card } from '@crosswise/uikit'

export const ClickableColumnHeader = styled(Text)`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const TableWrapper = styled(Flex)`
  width: 100%;
  padding-top: 16px;
  flex-direction: column;
  gap: 16px;
  background: ${({ theme, background }) => {
    if (background) {
      return background ?? theme.card.background
    }
    return theme.isDark ? theme.card.gradientBeta : theme.card.background
  }};
  border-radius: ${({ theme }) => theme.radii.card};
  border-top-left-radius: 0px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};

  @media (max-width: 800px) {
    border-top-right-radius: 0px;
  }
`

export const InnerTableWrapper = styled(Flex)`
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
