import React, { Fragment, memo } from 'react'
import { useTheme } from 'styled-components'
import { Trade } from '@crosswise/sdk'
import { Text, Flex, ChevronRightIcon } from '@crosswise/uikit'
import { unwrappedToken } from 'utils/wrappedCurrency'

export default memo(function SwapRoute({ trade }: { trade: Trade }) {
  const { isDark } = useTheme()
  return (
    <Flex flexWrap="wrap" width="100%" justifyContent="flex-end" alignItems="center">
      {trade.route.path.map((token, i, path) => {
        const isLastItem: boolean = i === path.length - 1
        const currency = unwrappedToken(token)
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={i}>
            <Flex alignItems="end">
              <Text
                fontSize="13px"
                ml="0.125rem"
                mr="0.125rem"
                gradient={isDark ? undefined : 'gradprimary'}
                color="primaryGray"
              >
                {currency.symbol}
              </Text>
            </Flex>
            {!isLastItem && <ChevronRightIcon width="12px" />}
          </Fragment>
        )
      })}
    </Flex>
  )
})
