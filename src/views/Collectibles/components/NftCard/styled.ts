import styled from 'styled-components'
import { Button } from '@crosswise/uikit'
import InfoRow from '../InfoRow'

// Index components
export const Header = styled(InfoRow)`
  min-height: 28px;
`

export const DetailsButton = styled(Button).attrs({ variant: 'text' })`
  height: auto;
  padding: 16px 24px;

  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }

  &:focus:not(:active) {
    box-shadow: none;
  }
`

export const InfoBlock = styled.div`
  padding: 24px;
`
