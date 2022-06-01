import styled from 'styled-components'
import { Text, Card, Flex } from '@crosswise/uikit'

export const Label = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const SwapRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`
export const TabMenuWrapper = styled.div`
  width: 100%;
  max-width: 520px;
  margin-left: 40px;

  @media (max-width: 1000px) {
    max-width: calc(100% - 80px);
  }

  @media (max-width: 800px) {
    margin-left: 0px;
    max-width: 100%;
  }
`

export const TabletWrapper = styled.div`
  display: none;
  @media (max-width: 1400px) {
    display: block;
  }
`

export const DesktopWrapper = styled.div`
  display: block;
  @media (max-width: 1400px) {
    display: none;
  }
`

export const LayoutContainer = styled(Flex)`
  @media (max-width: 1400px) {
    flex-direction: column;
  }
`

export const BuyWidgetContainer = styled.div`
  width: 100%;
  max-width: 346px;
  margin-bottom: 1rem;
  margin-left: 30px;
  @media (max-width: 1400px) {
    max-width: 100%;
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
  }
`

export const Wrapper = styled.div`
  position: relative;
  padding: 1rem;

  .column-2 div {
    grid-column: span 6;
  }
`

export const StyledCard = styled(Card)`
  background: none;
  width: 100%;
  z-index: 1;
  margin-bottom: 1rem;
`

export const StyledMainCard = styled(StyledCard)`
  @media (max-width: 800px) {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;

    & > div {
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
    }
  }
`

export const ClickableColumnHeader = styled(Text)`
  cursor: pointer;
`

export const TableWrapper = styled(Flex)`
  width: 100%;
  padding-top: 16px;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.card.background};
  border-radius: ${({ theme }) => theme.radii.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
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
