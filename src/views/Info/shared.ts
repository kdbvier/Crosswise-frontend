import styled from 'styled-components'
import { Card } from '@crosswise/uikit'

export const TabMenuWrapper = styled.div`
  width: 100%;
  max-width: calc(100% - 80px);
  margin-left: 40px;

  ${({ theme }) => theme.mediaQueries.xl} {
    max-width: calc(50% - 80px);
  }

  @media (min-width: 1280px) {
    max-width: 480px;
  }
`

export const StyledCard = styled(Card)`
  background: none;
  width: 100%;
  z-index: 1;
`

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
  padding: 1rem 0rem;
`
