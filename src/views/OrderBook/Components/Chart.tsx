import React, { useState, useEffect } from 'react'
import { Text, Flex, Dropdown } from '@crosswise/uikit'

import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useGelatoLimitOrders from 'hooks/limitOrders/useGelatoLimitOrders'
import { useTranslation } from 'contexts/Localization'
import { TokenPairImage } from 'components/TokenImage'
import LinearChart from 'components/Graph/LinearChart'
import { wrappedCurrency } from 'utils/wrappedCurrency'

import { getHistoricalData } from 'views/Home/components/Chart/helpers'
import { LineChartLoader } from 'views/Info/components/ChartLoaders'

import { ChartContainer } from './styled'
import { OrderPosition } from './types'

const routerVersion = 'crss'

const Chart: React.FC = () => {
  const { t } = useTranslation()

  const { chainId } = useActiveWeb3React()
  const graphOpts = [
    {
      label: t('Daily'),
      value: 10,
    },
    {
      label: t('Weekly'),
      value: '2H',
    },
    {
      label: t('Monthly'),
      value: '1D',
    },
    {
      label: t('Annual'),
      value: '1W',
    },
  ]
  const DAYS = [t('Sun'), t('Mon'), t('Tue'), t('Wed'), t('Thu'), t('Fri'), t('Sat')]
  const [graphResolution, setGraphResolution] = useState(graphOpts[0])

  const [chartData, setChartData] = useState([])
  const {
    derivedOrderInfo: { currencies },
  } = useGelatoLimitOrders()
  const tokenIn = wrappedCurrency(currencies[OrderPosition.INPUT.toLowerCase()], chainId)
  const tokenOut = wrappedCurrency(currencies[OrderPosition.OUTPUT.toLowerCase()], chainId)

  const fetchChartData = async () => {
    if (!tokenIn || !tokenOut) return

    const input = tokenOut.address // '0x99FEFBC5cA74cc740395D65D384EDD52Cb3088Bb'

    const quoteCurrency = {
      symbol: tokenIn.symbol,
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      pair: '0xb5d85cA38a9CbE63156a02650884D92A6e736DDC',
      exchangeName: 'BNB',
    }

    const data = await getHistoricalData(input, quoteCurrency, routerVersion, graphResolution.value, chainId)

    let arrayCount = 320

    if (graphResolution.value === 10) {
      arrayCount = 6 * 24
    } else if (graphResolution.value === '2H') {
      arrayCount = 12 * 7
    } else if (graphResolution.value === '1D') {
      arrayCount = 1 * 31
    } else if (graphResolution.value === '1W') {
      arrayCount = 54
    }

    const getFullDate = (time) => {
      if (graphResolution.value === 10) return `${time.getDate()}:${time.getHours()}:${time.getMinutes()}`
      if (graphResolution.value === '2H') return `${DAYS[time.getDay()]}`
      return `${time.getDate()}/${time.getMonth()}`
    }
    const filteredData = data.slice(-arrayCount).map((semidata) => {
      const time = new Date(semidata.time)
      const fullDate = getFullDate(time)
      return { value: semidata.low.toFixed(5), time: fullDate, fullTime: time, volume: semidata.volume.toFixed(5) }
    })
    setChartData(filteredData)
  }
  useEffect(() => {
    fetchChartData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphResolution, tokenIn, tokenOut])

  return (
    <ChartContainer>
      <Flex width="100%" mb="30px" justifyContent="space-between" alignItems="center">
        {tokenIn && tokenOut && (
          <Flex width="100%">
            <TokenPairImage
              primaryToken={{
                symbol: tokenIn.symbol,
                address: {
                  56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
                },
              }}
              secondaryToken={{
                symbol: tokenOut.symbol,
                address: {
                  56: '0x99FEFBC5cA74cc740395D65D384EDD52Cb3088Bb',
                },
              }}
              style={{ width: '42px' }}
              height={26}
              width={26}
            />
            <Text bold ml="8px">
              BNB - CRSS
              {/* {currencies[Field.INPUT].symbol} - {currencies[Field.OUTPUT].symbol} */}
            </Text>
          </Flex>
        )}
        <Dropdown list={graphOpts} current={graphResolution} placement="bottom-end" onClickItem={setGraphResolution} />
      </Flex>

      <Flex width="100%" flex={1} justifyContent="center">
        {!chartData || chartData.length === 0 ? (
          <LineChartLoader />
        ) : (
          <LinearChart data={chartData} /* setHoverValue={setPriceHover} setHoverDate={setPriceDateHover} */ />
        )}
      </Flex>
    </ChartContainer>
  )
}

export default Chart
