import styled from 'styled-components'
import { Card, CardBody, Button } from '@crosswise/uikit'

export const Body = styled(CardBody)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  flex: 1;
  padding: 30px;

  &:before {
    content: '';
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background: ${({ theme }) => theme.colors.input};
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    opacity: 0.25;
  }
`

export const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
    justify-content: flex-start;

    > div {
      padding: 0;
    }
  }
`
