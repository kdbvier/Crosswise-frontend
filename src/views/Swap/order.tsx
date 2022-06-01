import React from 'react'
import { CardsLayout } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { Wrapper } from './styled'
import { AppHeader } from '../../components/App'
// import OrderBuy from './components/orderBuy'
// import OrderSell from './components/orderSell'

export default function LimitOrder() {
  const { t } = useTranslation()

  return (
    <>
      <AppHeader title={t('Limit')} subtitle={t('')} noConfig />
      <Wrapper id="order-page">
        {/* <AutoRow justify="space-between"> */}
        <CardsLayout className="column-2">
          {/* <OrderBuy />
          <OrderSell /> */}
        </CardsLayout>
        {/* </AutoRow> */}
      </Wrapper>
    </>
  )
}
