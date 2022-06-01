import React from 'react'
import { Currency, Percent, Price } from '@crosswise/sdk'
// import { Flex, Text, HelpIcon, useTooltip } from '@crosswise/uikit'
import { Flex, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import {
  IconRefresh,
  // IconSync
} from 'components/SvgIcons'
import { escapeRegExp } from 'utils'
import { Rate } from 'state/limitOrders/types'
import { getRatePercentageMessage, PercentageDirection } from '../utils/getRatePercentageMessage'

import {
  OrderPriceWrapper as Wrapper,
  OrderMarketPriceButton,
  OrderPriceInput,
  // LabelContainer,
  ChangeRateTypeContainer,
  ChangeRateTypeButton as Button,
} from './styled'

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

interface LimitOrderPriceProps {
  id: string
  value: string
  onUserInput: (value: string) => void
  inputCurrency: Currency
  outputCurrency: Currency
  percentageRateDifference: Percent
  rateType: Rate
  handleRateType: (rateType: Rate, price?: Price) => void
  price: Price
  handleResetToMarketPrice: () => void
  realExecutionPriceAsString: string
  disabled: boolean
}

const DIRECTION_COLORS = {
  [PercentageDirection.ABOVE]: 'success',
  [PercentageDirection.BELOW]: 'failure',
  [PercentageDirection.MARKET]: 'textSubtle',
}

const LimitOrderPrice: React.FC<LimitOrderPriceProps> = ({
  id,
  value,
  onUserInput,
  inputCurrency,
  outputCurrency,
  percentageRateDifference,
  rateType,
  handleRateType,
  price,
  handleResetToMarketPrice,
  realExecutionPriceAsString,
  disabled,
}) => {
  const { t } = useTranslation()

  const hasCurrencyInfo = inputCurrency && outputCurrency
  // const label =
  //   rateType === Rate.MUL
  //     ? `${outputCurrency?.symbol} per ${inputCurrency?.symbol}`
  //     : `${inputCurrency?.symbol} per ${outputCurrency?.symbol}`

  const toggleRateType = () => {
    handleRateType(rateType, price)
  }

  // const { targetRef, tooltip, tooltipVisible } = useTooltip(
  //   <>
  //     <Text>
  //       {t(
  //         'Takes into account the gas necessary to execute your order and guarantees that your desired rate is fulfilled.',
  //       )}
  //     </Text>
  //     <Text>{t('It fluctuates according to gas prices.')}</Text>
  //     {inputCurrency?.symbol && outputCurrency?.symbol && realExecutionPriceAsString && (
  //       <Text>
  //         {realExecutionPriceAsString === 'never executes'
  //           ? t(
  //               'Assuming current gas price this order will never execute. Try increasing the amount of tokens to swap.',
  //             )
  //           : t('Assuming current gas price it should execute when 1 %assetOneSymbol% = %price% %assetTwoSymbol%', {
  //               assetOneSymbol: rateType === Rate.MUL ? inputCurrency?.symbol : outputCurrency?.symbol,
  //               assetTwoSymbol: rateType === Rate.MUL ? outputCurrency?.symbol : inputCurrency?.symbol,
  //               price: realExecutionPriceAsString,
  //             })}
  //       </Text>
  //     )}
  //   </>,
  //   { placement: 'top' },
  // )

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextUserInput = event.target.value.replace(/,/g, '.')
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput)
    }
  }

  const isAtMarketPrice = percentageRateDifference?.equalTo('0') ?? true
  const [ratePercentageMessage, direction] = getRatePercentageMessage(percentageRateDifference, t)
  const priceLabelColor = DIRECTION_COLORS[direction]
  return (
    <>
      <Flex justifyContent="space-between" id={id}>
        <Flex alignItems="center">
          <Text mr="8px" color="textSecondary" fontSize="12px" bold textTransform="uppercase">
            {t('Price Market')}
          </Text>
          <OrderMarketPriceButton
            onClick={handleResetToMarketPrice}
            startIcon={<IconRefresh color={isAtMarketPrice ? 'textSecondary' : 'primary'} />}
            // variant="secondary"
            scale="xs"
            disabled={isAtMarketPrice}
          >
            {/* <Text fontSize="12px" bold color={isAtMarketPrice ? 'textDisabled' : 'primary'} textTransform="uppercase">
              {t('Market')}
            </Text> */}
          </OrderMarketPriceButton>
        </Flex>
        {ratePercentageMessage && (
          <Text color={priceLabelColor} fontSize="12px">
            {ratePercentageMessage}
          </Text>
        )}
      </Flex>
      <Wrapper>
        <span>{`1 ${rateType === Rate.MUL ? inputCurrency?.symbol : outputCurrency?.symbol}=`}</span>
        <OrderPriceInput
          value={value}
          disabled={disabled}
          onChange={handleOnChange}
          autoComplete="off"
          autoCorrect="off"
          pattern="^[0-9]*[.,]?[0-9]*$"
          minLength={1}
          maxLength={79}
          spellCheck="false"
          type="text"
          inputMode="decimal"
        />
        <span>{rateType === Rate.MUL ? outputCurrency?.symbol : inputCurrency?.symbol}</span>
      </Wrapper>
      {hasCurrencyInfo && (
        // <LabelContainer justifyContent="flex-start" alignItems="center" onClick={toggleRateType} py="12px">
        //   <Text small bold>
        //     {label}
        //   </Text>
        //   <IconSync color="primary" width="24px" ml="4px" />
        // </LabelContainer>
        <ChangeRateTypeContainer>
          <Button
            variant={rateType === Rate.DIV ? 'primaryGradient' : 'primaryGradientOutline'}
            onClick={() => rateType === Rate.DIV && toggleRateType()}
          >
            {`per ${inputCurrency?.symbol}`}
          </Button>
          <Button
            variant={rateType === Rate.MUL ? 'primaryGradient' : 'primaryGradientOutline'}
            onClick={() => rateType === Rate.MUL && toggleRateType()}
          >
            {`per ${outputCurrency?.symbol}`}
          </Button>
        </ChangeRateTypeContainer>
      )}
      <Flex justifySelf="flex-end" mb="8px" minHeight="16px">
        {realExecutionPriceAsString && (
          <>
            <Text
              small
              // color="textSubtle"
              mr="4px"
            >
              {t('Real execution price: %price%', { price: realExecutionPriceAsString })}
            </Text>
            {/* <span ref={targetRef}>
              <HelpIcon color="textSubtle" />
              {tooltipVisible && tooltip}
            </span> */}
          </>
        )}
      </Flex>
    </>
  )
}

export default LimitOrderPrice
