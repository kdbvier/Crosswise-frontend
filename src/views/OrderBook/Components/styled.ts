import styled from 'styled-components'
import { Flex, Input, Button, Checkbox } from '@crosswise/uikit'

// CHART COMPONENT
export const ChartContainer = styled(Flex)`
  padding: 30px;
  width: 100%;
  height: 100%;
  min-height: 480px;
  flex-direction: column;
`

// LIMIT ORDER CRYPTO PANEL
export const LimitOrderCryptoPanel = styled.div`
  background: ${({ theme }) => theme.colors.gradients.gradsecondary};
  border: 1px solid rgba(224, 224, 255, 0.24);
  border-radius: 20px;
  min-height: 640px;
`

export const PanelHeader = styled.div`
  height: 60px;
  width: 100%;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.gradients.btngradprimary};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`

export const PanelBody = styled.div`
  border-top: 1px solid rgba(196, 196, 196, 0.1);
  padding: 0px 12px;
`

export const PlaceOrderButton = styled(Button)`
  white-space: normal;
`

export const ViewChartCheckbox = styled.div`
  display: flex;
  align-items: center;
  & > ${Checkbox} {
    margin-right: 8px;
    width: 14px;
    height: 14px;
    border: 1px solid #818ea3;
    border-radius: 2px;
  }
`

// LIMIT ORDER PRICE PANEL
export const OrderPriceWrapper = styled.div`
  width: 100%;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
  padding: 6px 12px;
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  color: white;
  font-size: 18px;
`

export const OrderMarketPriceButton = styled(Button)`
  background-color: transparent;
  &:hover {
    background: none !important;
    box-shadow: none !important;
  }
`

export const OrderPriceInput = styled(Input)`
  background: none;
  box-shadow: none;
  padding-left: 0;
  font-size: 18px;
  text-align: right;
  &:disabled {
    background-color: unset;
  }
`

export const LabelContainer = styled(Flex)`
  cursor: pointer;
`

export const ChangeRateTypeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: space-between;
  grid-gap: 15px;
  margin-top: 16px;
`

export const ChangeRateTypeButton = styled(Button)`
  height: 25px;
`
