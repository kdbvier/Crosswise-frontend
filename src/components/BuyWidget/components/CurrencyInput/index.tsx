import React from 'react'
import { Currency, Pair } from '@crosswise/sdk'
import { Text, Flex } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
// import useActiveWeb3React from 'hooks/useActiveWeb3React'

import { Input as NumericalInput } from 'components/CurrencyInputPanel/NumericalInput'

import { InputRow, LabelRow, CurrencySelectButton, InputPanel, Container } from './styled'

interface CurrencyInputProps {
  label?: string | null
  value: string
  onUserInput: (value: string) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  pair?: Pair | null
  hideInput?: boolean
  id: string
  append?: string | null
}
export default function CurrencyInput({
  label = null,
  value,
  onUserInput,
  currency,
  disableCurrencySelect = false,
  pair = null, // used for double token logo
  hideInput = false,
  id,
  append = null,
}: CurrencyInputProps) {
  // const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  return (
    <InputPanel id={id}>
      {label ? (
        <LabelRow>
          <Text fontSize="13px" fontWeight="500" color="textSecondary">
            {label}
          </Text>
        </LabelRow>
      ) : (
        <></>
      )}
      <Container hideInput={hideInput}>
        <InputRow selected={disableCurrencySelect}>
          <NumericalInput
            className="token-amount-input"
            value={value}
            onUserInput={(val) => {
              onUserInput(val)
            }}
          />
          <CurrencySelectButton selected={!!currency} className="open-currency-select-button">
            <Flex alignItems="center" justifyContent="space-between">
              {append ? (
                <Text id="append">{append}</Text>
              ) : pair ? (
                <Text id="pair">
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text id="pair">
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                        currency.symbol.length - 5,
                        currency.symbol.length,
                      )}`
                    : currency?.symbol) || t('Select a currency')}
                </Text>
              )}
            </Flex>
          </CurrencySelectButton>
        </InputRow>
      </Container>
    </InputPanel>
  )
}
