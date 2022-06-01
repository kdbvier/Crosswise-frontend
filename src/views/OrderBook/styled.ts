import styled from 'styled-components'
import { Card, Flex } from '@crosswise/uikit'

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

export const ChartContainer = styled(Flex)`
  padding: 30px;
  width: 100%;
  height: 100%;
  min-height: 480px;
`
