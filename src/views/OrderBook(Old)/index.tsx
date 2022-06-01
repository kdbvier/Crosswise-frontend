import React from 'react'
import { useRouteMatch, Route, Switch } from 'react-router-dom'

import SubNav from './components/SubNav'
import TradeNow from './TradeNow'
import LimitOrders from './LimitOrders'

import { StyledPage, ControlContainer } from './styled'

const OrderBook = () => {
  const { path } = useRouteMatch()

  return (
    <StyledPage>
      <ControlContainer>
        <SubNav />
        <Switch>
          <Route path={`${path}/tradenow`}>
            <TradeNow />
          </Route>
          <Route path={`${path}/limitorder`}>
            <LimitOrders />
          </Route>
        </Switch>
        {/* {activeIndex === 0 && <TradeNow />} */}
      </ControlContainer>
    </StyledPage>
  )
}

export default OrderBook
