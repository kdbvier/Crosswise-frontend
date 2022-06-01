import styled from 'styled-components'
import { Card } from '@crosswise/uikit'

export const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ScrollButtonContainer = styled.div`
  margin: auto;
  padding-top: 5px;
  padding-bottom: 5px;
`

export const StyledCard = styled(Card)`
  background: none;
  width: 100%;
  z-index: 1;
  margin: 1rem 0;
`
