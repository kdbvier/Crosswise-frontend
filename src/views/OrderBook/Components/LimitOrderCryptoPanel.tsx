import React, { useCallback, useState, useEffect } from 'react'
import { Flex, Box, Text, ExpandableButton, Dropdown, DropdownItem, Checkbox } from '@crosswise/uikit'
import { CurrencyAmount } from '@crosswise/sdk'

import { useTranslation } from 'contexts/Localization'
import useBUSDPrice from 'hooks/useBUSDPrice'
import useGelatoLimitOrders from 'hooks/limitOrders/useGelatoLimitOrders'
import useGasOverhead from 'hooks/limitOrders/useGasOverhead'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ApprovalState } from 'hooks/useApproveCallback'
import { Field } from 'state/limitOrders/types'
import { useDefaultsFromURLSearch } from 'state/limitOrders/hooks'
import GlobalSettings from 'components/Menu/GlobalSettings'
import Transactions from 'components/App/Transactions'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { maxAmountSpend } from 'utils/maxAmountSpend'

import getRatePercentageDifference from '../utils/getRatePercentageDifference'

import LimitOrderPrice from './LimitOrderPrice'
import { LimitOrderCryptoPanel as Wrapper, PanelHeader, PanelBody, PlaceOrderButton, ViewChartCheckbox } from './styled'

const AmountOptions: DropdownItem[] = [
  {
    value: 1,
    label: 'Max',
  },
  {
    value: 0.75,
    label: '75%',
  },
  {
    value: 0.5,
    label: '50%',
  },
  {
    value: 0.25,
    label: '25%',
  },
  {
    value: 0.1,
    label: '10%',
  },
]

const ExpireOptions: DropdownItem[] = [
  {
    value: '3D',
    label: '3 Days',
  },
  {
    value: '2D',
    label: '2 Days',
  },
  {
    value: '1D',
    label: '1 Days',
  },
  {
    value: '12H',
    label: '12 H',
  },
  {
    value: '1H',
    label: '1 H',
  },
]

const LimitOrderCryptoPanel: React.FC = () => {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)
  const [inputViewChart, setInputViewChart] = useState<boolean>(false)
  const [outputViewChart, setOutputViewChart] = useState<boolean>(false)
  const [currentAmountOption, setCurrentAmountOption] = useState<DropdownItem>(AmountOptions[0])
  const [currentExpireOption, setCurrentExpireOption] = useState<DropdownItem>(ExpireOptions[0])

  useDefaultsFromURLSearch()

  const {
    handlers: { handleInput, handleCurrencySelection, handleSwitchTokens, handleRateType },
    derivedOrderInfo: {
      currencies,
      currencyBalances,
      parsedAmounts,
      formattedAmounts,
      rawAmounts,
      trade,
      price,
      inputError,
      wrappedCurrencies,
      singleTokenPrice,
      currencyIds,
    },
    orderState: { independentField, basisField, rateType },
  } = useGelatoLimitOrders()

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances.input)
  // const hideMaxButton = Boolean(maxAmountInput && parsedAmounts.input?.equalTo(maxAmountInput))

  // Trade execution price is always "in MUL mode", even if UI handles DIV rate
  const currentMarketRate = trade?.executionPrice
  const percentageRateDifference = getRatePercentageDifference(currentMarketRate, price)

  const inputTokenPrice = useBUSDPrice(currencies[Field.INPUT.toLowerCase()])
  const outputTokenPrice = useBUSDPrice(currencies[Field.OUTPUT.toLowerCase()])

  // UI handlers
  const handleTypeInput = useCallback(
    (value: string) => {
      handleInput(Field.INPUT, value)
    },
    [handleInput],
  )

  const handleTypeOutput = useCallback(
    (value: string) => {
      handleInput(Field.OUTPUT, value)
    },
    [handleInput],
  )

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false)
      handleCurrencySelection(Field.INPUT, inputCurrency)
    },
    [handleCurrencySelection],
  )

  const handleTypeDesiredRate = useCallback(
    (value: string) => {
      handleInput(Field.PRICE, value)
    },
    [handleInput],
  )

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      handleCurrencySelection(Field.OUTPUT, outputCurrency)
    },
    [handleCurrencySelection],
  )

  const handleMaxInput = useCallback(
    (percentage: number) => {
      if (maxAmountInput) {
        const maxValue = parseFloat(maxAmountInput.toExact())
        handleInput(Field.INPUT, (maxValue * percentage).toString())
      }
    },
    [maxAmountInput, handleInput],
  )

  const handleAmount = (option: DropdownItem) => {
    setCurrentAmountOption(option)
    handleMaxInput(option.value)
  }

  const handleChangeExpireOption = (option: DropdownItem) => {
    setCurrentExpireOption(option)
  }

  // Trick to reset to market price via fake update on the basis field
  const handleResetToMarketPrice = useCallback(() => {
    if (basisField === Field.INPUT) {
      handleTypeInput(formattedAmounts.input)
    } else {
      handleTypeOutput(formattedAmounts.output)
    }
  }, [handleTypeInput, handleTypeOutput, formattedAmounts.input, formattedAmounts.output, basisField])

  const { realExecutionPriceAsString } = useGasOverhead(parsedAmounts.input, parsedAmounts.output, rateType)

  return (
    <Wrapper>
      <PanelHeader>Set your limit Order</PanelHeader>
      <PanelBody>
        <Flex alignItems="center" justifyContent="flex-end" my="16px">
          <GlobalSettings />
          <Transactions />
        </Flex>
        <Box>
          <LimitOrderPrice
            id="limit-order-desired-rate-input"
            value={formattedAmounts.price}
            onUserInput={handleTypeDesiredRate}
            inputCurrency={currencies.input}
            outputCurrency={currencies.output}
            percentageRateDifference={percentageRateDifference}
            rateType={rateType}
            handleRateType={handleRateType}
            price={price}
            handleResetToMarketPrice={handleResetToMarketPrice}
            realExecutionPriceAsString={!inputError ? realExecutionPriceAsString : undefined}
            disabled={!formattedAmounts.input && !formattedAmounts.output}
          />

          <CurrencyInputPanel
            // label={independentField === Field.OUTPUT ? t('From (estimated)') : t('From')}
            label="You Pay"
            labelFontSize="13px"
            value={formattedAmounts[Field.INPUT]}
            showMaxButton={false}
            currency={currencies[Field.INPUT.toLowerCase()]}
            onUserInput={handleTypeInput}
            onCurrencySelect={handleInputSelect}
            otherCurrency={currencies[Field.OUTPUT.toLowerCase()]}
            id="limit-order-currency-input"
            hideBalance
            customOperationRender={() => (
              <ViewChartCheckbox>
                <Checkbox
                  name="confirmed"
                  type="checkbox"
                  checked={inputViewChart}
                  onChange={() => setInputViewChart(!inputViewChart)}
                  scale="sm"
                />
                <Text color="textSecondary" fontSize="13px" letterSpacing="0.04em">
                  View Chart
                </Text>
              </ViewChartCheckbox>
            )}
          />

          <Flex justifyContent="space-between" alignItems="center" py="12px">
            <Text color="textSecondary" fontSize="10px" letterSpacing="0.04em" width="140px">
              {inputTokenPrice && parsedAmounts[Field.INPUT.toLowerCase()]
                ? `~ ${inputTokenPrice.quote(parsedAmounts[Field.INPUT.toLowerCase()]).toSignificant(6)} USD`
                : ''}
            </Text>
            <ExpandableButton
              direction="vertical"
              onClick={() => {
                setApprovalSubmitted(false) // reset 2 step UI for approvals
                handleSwitchTokens()
              }}
            />

            <Flex justifyContent="end" width="140px">
              <Dropdown
                list={AmountOptions}
                placement="bottom-start"
                scale="xs"
                current={currentAmountOption}
                onClickItem={handleAmount}
              />
            </Flex>
          </Flex>

          <CurrencyInputPanel
            value={formattedAmounts[Field.OUTPUT.toLowerCase()]}
            onUserInput={handleTypeOutput}
            // label={independentField === Field.INPUT ? t('To (estimated)') : t('To')}
            label="You Receive"
            labelFontSize="13px"
            showMaxButton={false}
            currency={currencies[Field.OUTPUT.toLowerCase()]}
            onCurrencySelect={handleOutputSelect}
            otherCurrency={currencies[Field.INPUT.toLowerCase()]}
            id="limit-order-currency-output"
            hideBalance
            customOperationRender={() => (
              <ViewChartCheckbox>
                <Checkbox
                  name="confirmed"
                  type="checkbox"
                  checked={outputViewChart}
                  onChange={() => setOutputViewChart(!outputViewChart)}
                  scale="sm"
                />
                <Text color="textSecondary" fontSize="13px" letterSpacing="0.04em">
                  View Chart
                </Text>
              </ViewChartCheckbox>
            )}
          />

          <Flex justifyContent="space-between" alignItems="center" py="12px">
            <Text color="textSecondary" fontSize="10px" letterSpacing="0.04em" minHeight="15px">
              {outputTokenPrice && parsedAmounts[Field.OUTPUT.toLowerCase()]
                ? `~ ${outputTokenPrice.quote(parsedAmounts[Field.OUTPUT.toLowerCase()]).toSignificant(6)} USD`
                : ''}
            </Text>

            <Flex justifyContent="end" alignItems="center" width="140px">
              <Text fontSize="11px" mr="10px">
                EXPIRES IN
              </Text>
              <Dropdown
                list={ExpireOptions}
                placement="bottom-start"
                scale="xs"
                current={currentExpireOption}
                onClickItem={handleChangeExpireOption}
              />
            </Flex>
          </Flex>

          <Box mt="0.25rem">
            {!account ? (
              <ConnectWalletButton variant="primaryGradient" width="100%" btnString={t('Connect Wallet')} />
            ) : (
              <PlaceOrderButton
                variant="primaryGradient"
                onClick={() => {
                  console.log('Place an Order Button clicked')
                }}
                id="place-order-button"
                width="100%"
                disabled={!!inputError || realExecutionPriceAsString === 'never executes'}
              >
                {inputError || realExecutionPriceAsString === 'never executes'
                  ? inputError || t("Can't execute this order")
                  : t('Review & Place Limit Order')}
              </PlaceOrderButton>
            )}
          </Box>
        </Box>
      </PanelBody>
    </Wrapper>
  )
}

export default LimitOrderCryptoPanel
