import React, { useState, useCallback, memo } from 'react'
import { Flex, Card, TabMenu, Tab } from '@crosswise/uikit'
// import useGelatoLimitOrdersHistory from '../../hooks/useGelatoLimitOrdersHistory'

import { ORDER_CATEGORY } from '../../types'

import CompactLimitOrderTable from './CompactLimitOrderTable'
import NoOrdersMessage from './NoOrdersMessage'
import LoadingTable from './LoadingTable'
import SpaciousLimitOrderTable from './SpaciousLimitOrderTable'
import Navigation from './TableNavigation'

import { TabMenuWrapper } from './styled'

const OrderTable: React.FC<{ isCompact: boolean; orderCategory: ORDER_CATEGORY }> = memo(
  ({ orderCategory, isCompact }) => {
    // const orders = useGelatoLimitOrdersHistory(orderCategory)
    const orders = []

    if (!orders) return <LoadingTable />

    if (!orders?.length) {
      return <NoOrdersMessage orderCategory={orderCategory} />
    }

    return (
      <Navigation data={orders} resetFlag={orderCategory}>
        {({ paginatedData }) =>
          isCompact ? (
            <CompactLimitOrderTable orders={paginatedData} />
          ) : (
            <SpaciousLimitOrderTable orders={paginatedData} />
          )
        }
      </Navigation>
    )
  },
)

const LimitOrderTable: React.FC<{ isCompact: boolean }> = ({ isCompact }) => {
  const [activeTab, setIndex] = useState<ORDER_CATEGORY>(ORDER_CATEGORY.Open)
  const handleClick = useCallback((tabType: ORDER_CATEGORY) => setIndex(tabType), [])

  return (
    <Flex flex="1" justifyContent="center" mb="24px" flexDirection="column">
      <TabMenuWrapper>
        <TabMenu activeIndex={activeTab} variant="primaryGradient" onItemClick={handleClick} fullWidth>
          <Tab>Open Orders</Tab>
          <Tab>Order History</Tab>
        </TabMenu>
      </TabMenuWrapper>
      <Card style={{ width: '100%', height: 'max-content' }}>
        <OrderTable orderCategory={activeTab} isCompact={isCompact} />
      </Card>
    </Flex>
  )
}

export default memo(LimitOrderTable)
