import React, { useState } from 'react'
import { Text, Box, useModal, Flex, ExpandableButton, Dropdown, DropdownItem } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'
import { Input as NumericalInput } from './NumericalInput'
// import { InputRow, CurrencySelectButton, LabelRow, InputPanel, Container } from './styled'
import { InputRow, CurrencySelectButton, InputPanel, Container } from './styled'
import { CurrencyInputPanelProps } from './interfaces'

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

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onChangeAmount,
  showMaxButton,
  label,
  labelFontSize = '10px',
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
  customOperationRender = null,
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()
  const translatedLabel = label || t('Input')

  const [currentOption, setCurrentOption] = useState<DropdownItem>(AmountOptions[0])

  const getTokenSymbol = (): string | null => {
    if (pair) {
      return `${pair?.token0.symbol}:${pair?.token1.symbol}`
    }

    if (currency?.symbol) {
      if (currency.symbol.length > 20)
        return `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
          currency.symbol.length - 5,
          currency.symbol.length,
        )}`

      return currency.symbol
    }
    return null
  }

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
    />,
  )

  const handleAmount = (option: DropdownItem) => {
    setCurrentOption(option)
    if (onChangeAmount) onChangeAmount(option.value)
  }

  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <Flex justifyContent="space-between" my="6px">
            <Text color="textSecondary" fontSize={labelFontSize} letterSpacing="0.04em">
              {translatedLabel}
            </Text>
            {!hideBalance && account && (
              <Text color="textSecondary" fontSize={labelFontSize} letterSpacing="0.04em" textTransform="uppercase">
                {!!currency && selectedCurrencyBalance
                  ? t('Balance %amount% %symbol%', {
                      amount: selectedCurrencyBalance?.toSignificant(6) ?? '',
                      symbol: getTokenSymbol(),
                    })
                  : ' -'}
              </Text>
            )}
            {customOperationRender && typeof customOperationRender === 'function' && customOperationRender()}
          </Flex>
        )}
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
              />
              {account && currency && showMaxButton && (
                <Box mx="10px">
                  <Dropdown
                    list={AmountOptions}
                    placement="bottom-start"
                    scale="xs"
                    current={currentOption}
                    onClickItem={handleAmount}
                  />
                </Box>
              )}
            </>
          )}
          <CurrencySelectButton
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                onPresentCurrencyModal()
              }
            }}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Text id="pair" color="textSecondary" style={{ marginRight: '8px' }}>
                {getTokenSymbol() || t('Select a currency')}
              </Text>
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
              ) : currency ? (
                <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
              ) : null}
              {!disableCurrencySelect && <ExpandableButton direction="down" />}
            </Flex>
          </CurrencySelectButton>
        </InputRow>
      </Container>
    </InputPanel>
  )
}
