import React from 'react'
import { Text, Flex } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { Input as NumericalInput } from './NumericalInput'
import { InputRow, InputPanel, Container } from './styled'
import { PriceInputPanelProps } from './interfaces'

export default function CurrencyInputPanel({ value, onUserInput, label, id }: PriceInputPanelProps) {
  const { t } = useTranslation()
  const translatedLabel = label || t('Price')

  return (
    <InputPanel id={id}>
      <Container>
        <Flex justifyContent="space-between" my="6px">
          <Text color="textSecondary" fontSize="10px" letterSpacing="0.04em">
            {translatedLabel}
          </Text>
          {/* {account && (
            <Text color="textSecondary" fontSize="10px" letterSpacing="0.04em" textTransform="uppercase">
              {!hideBalance && !!currency && selectedCurrencyBalance
                ? t('Balance %amount% %symbol%', {
                    amount: selectedCurrencyBalance?.toSignificant(6) ?? '',
                    symbol: getTokenSymbol(),
                  })
                : ' -'}
            </Text>
          )} */}
        </Flex>
        <InputRow>
          <NumericalInput
            className="price-input"
            value={value}
            onUserInput={(val) => {
              onUserInput(val)
            }}
          />
        </InputRow>
      </Container>
    </InputPanel>
  )
}
