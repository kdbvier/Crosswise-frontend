import { Button, Card } from '@crosswise/uikit'
import styled from 'styled-components'

export const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: none;
  border-radius: 4px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 47%;
  }
`

export const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin: 1rem 0;
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;

    > div {
      padding: 0;
    }
  }
`

export const StyledCard = styled(Card)`
  background: none;
  width: 100%;
  height: 100%;
  z-index: 1;
`
