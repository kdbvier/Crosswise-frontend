import React from 'react'
import { Flex } from '@crosswise/uikit'
import Menu from '../components/Menu'
import TradingView from '../components/TradingView'
import { MenuWrapper, ChartWrapper } from './styled'

const Chart = () => {
  return (
    <Flex flexDirection="column" height="100%">
      <MenuWrapper>
        <Menu />
      </MenuWrapper>
      <ChartWrapper>
        <TradingView />
      </ChartWrapper>
    </Flex>
  )
}

export default Chart
