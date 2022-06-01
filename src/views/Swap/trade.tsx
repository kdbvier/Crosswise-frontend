import React from 'react'
import {
  Button,
  Text,
  ArrowDownIcon,
  ArrowForwardIcon,
  Box,
  useModal,
  Flex,
  Toggle,
  CardsLayout,
} from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { Wrapper } from './styled'
// import OrderBuy from './components/orderBuy'
// import OrderSell from './components/orderSell'
// import TradeBuy from './components/TradeBuy'
// import TradeSell from './components/TradeSell'

export default function TradeToken() {
  const { t } = useTranslation()

  return (
    <Wrapper id="order-page" style={{ width: '100%' }}>
      <CardsLayout className="column-2" style={{ width: '100%' }} />
    </Wrapper>
  )
}
