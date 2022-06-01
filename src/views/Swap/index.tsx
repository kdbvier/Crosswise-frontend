import React, { useState, useCallback, useEffect, useMemo } from 'react'
// import { Button, Text, ArrowDownIcon, ArrowForwardIcon, Box, useModal, Flex, Toggle } from '@crosswise/uikit'
import { Button, Text, ArrowDownIcon, ArrowForwardIcon, Box, Flex, useModal, Dropdown } from '@crosswise/uikit'
import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import LinearChart from 'components/Graph/LinearChart'
import { LineChartLoader } from 'views/Info/components/ChartLoaders'
import { TokenPairImage } from 'components/TokenImage'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { Field } from '../../state/swap/actions'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../state/swap/hooks'
import { getHistoricalData } from '../Home/components/Chart/helpers'

import { SwapRow, Wrapper } from './styled'

const routerVersion = 'crss'

export default function Swap({ history }: RouteComponentProps) {
  const loadedUrlParams = useDefaultsFromURLSearch()

  const { t } = useTranslation()

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
  const CRSS_BNB = {
    56: '0xb5d85cA38a9CbE63156a02650884D92A6e736DDC',
    97: '0xF067DDd0010f91734B3349c6df6F115E842fF6d4',
  }
  // const [priceHover, setPriceHover] = useState<number | undefined>()
  // const [priceDateHover, setPriceDateHover] = useState<string | undefined>()
  const [graphResolution, setGraphResolution] = useState(graphOpts[0])
  const { chainId } = useActiveWeb3React()

  const { currencies } = useDerivedSwapInfo()

  const tokenIn = wrappedCurrency(currencies[Field.INPUT], chainId)
  const tokenOut = wrappedCurrency(currencies[Field.OUTPUT], chainId)
  const [chartData, setChartData] = useState([])

  const fetchChartData = async () => {
    if (!tokenIn || !tokenOut) return

    const input = tokenOut.address // '0x99FEFBC5cA74cc740395D65D384EDD52Cb3088Bb'

    const quoteCurrency = {
      symbol: tokenIn.symbol,
      address: tokenIn.address,
      pair: CRSS_BNB[chainId],
      exchangeName: tokenIn.name,
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
    <Wrapper id="swap-page" flexDirection="column">
      <Flex width="100%" mb="30px" justifyContent="space-between" alignItems="center">
        {tokenIn && tokenOut && (
          <Flex width="100%">
            <TokenPairImage
              primaryToken={{
                symbol: tokenIn.symbol,
                address: {
                  56: tokenIn.address,
                },
              }}
              secondaryToken={{
                symbol: tokenOut.symbol,
                address: {
                  56: tokenOut.address,
                },
              }}
              style={{ width: '42px' }}
              height={26}
              width={26}
            />
            <Text bold ml="8px">
              {currencies[Field.INPUT].symbol} - {currencies[Field.OUTPUT].symbol}
            </Text>
          </Flex>
        )}
        <Dropdown list={graphOpts} current={graphResolution} placement="bottom-end" onClickItem={setGraphResolution} />
      </Flex>
      {/* <Box height="60px">
          {priceHover && (
            <Text bold>{`${priceHover} ${currencies[Field.INPUT].symbol}/${currencies[Field.OUTPUT].symbol}`}</Text>
          )}
          {priceDateHover && <Text>{priceDateHover}</Text>}
        </Box> */}
      <Flex width="100%" flex={1} justifyContent="center">
        {!chartData || chartData.length === 0 ? (
          <LineChartLoader />
        ) : (
          <LinearChart data={chartData} /* setHoverValue={setPriceHover} setHoverDate={setPriceDateHover} */ />
        )}
      </Flex>

      <SwapRow>
        {/* <CurrencyInputPanel
            label={independentField === Field.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From')}
            value={formattedAmounts[Field.INPUT]}
            showMaxButton={!atMaxAmountInput}
            currency={currencies[Field.INPUT]}
            onUserInput={handleTypeInput}
            onMax={handleMaxInput}
            onCurrencySelect={handleInputSelect}
            otherCurrency={currencies[Field.OUTPUT]}
            id="swap-currency-input"
          />
          <AutoColumn justify="space-between">
            <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
              <ArrowWrapper clickable>
                <ArrowForwardIcon
                  width="16px"
                  onClick={() => {
                    setApprovalSubmitted(false) // reset 2 step UI for approvals
                    onSwitchTokens()
                  }}
                  color={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? 'primary' : 'text'}
                />
              </ArrowWrapper>
              {recipient === null && !showWrap && isExpertMode ? (
                <Button variant="text" id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                  {t('+ Add a send (optional)')}
                </Button>
              ) : null}
            </AutoRow>
          </AutoColumn>
          <CurrencyInputPanel
            value={formattedAmounts[Field.OUTPUT]}
            onUserInput={handleTypeOutput}
            label={independentField === Field.INPUT && !showWrap && trade ? t('To (estimated)') : t('To')}
            showMaxButton={false}
            currency={currencies[Field.OUTPUT]}
            onCurrencySelect={handleOutputSelect}
            otherCurrency={currencies[Field.INPUT]}
            id="swap-currency-output"
          /> */}
      </SwapRow>
      {/* <AutoRow>
          {isExpertMode && recipient !== null && !showWrap ? (
            <>
              <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                <ArrowWrapper clickable={false}>
                  <ArrowDownIcon width="16px" />
                </ArrowWrapper>
                <Button variant="text" id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                  {t('- Remove send')}
                </Button>
              </AutoRow>
              <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
            </>
          ) : null}

          {showWrap ? null : (
            <AutoColumn gap="8px" style={{ padding: '16px 16px 0' }}>
              {Boolean(trade) && (
                <RowBetween align="center">
                  <Label>{t('Price')}</Label>
                  <TradePrice
                    price={trade?.executionPrice}
                    showInverted={showInverted}
                    setShowInverted={setShowInverted}
                  />
                </RowBetween>
              )}
              {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                <RowBetween align="center">
                  <Label>{t('Slippage Tolerance')}&nbsp;</Label>
                  <Text bold color="primary">
                    {allowedSlippage / 100}%
                  </Text>
                </RowBetween>
              )}
            </AutoColumn>
          )}
        </AutoRow> */}
    </Wrapper>
  )
}
