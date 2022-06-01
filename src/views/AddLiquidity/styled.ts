import styled from 'styled-components'
import { Card } from '@crosswise/uikit'

export const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  max-width: 1200px;
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
  z-index: 1;
`

export const StyledCardBody = styled.div`
  padding: 0px 12px 30px 12px;
`

export const StyledCenterBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  margin: 8px 0;
  align-items: center;
`

export const AddIconBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 6px;
    border: 1px solid transparent;
    background: ${({ theme }) => theme.colors.gradients.btngradprimary} border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`

export const StyledDivider = styled.div`
  margin: 16px 0;
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.modalBorder};
`
