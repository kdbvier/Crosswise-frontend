import React from 'react'
import { Currency, CurrencyAmount, Fraction, Percent } from '@crosswise/sdk'
import { Button, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { RowBetween, RowFixed } from '../../../components/Layout/Row'
import { CurrencyLogo } from '../../../components/Logo'
import { Field } from '../../../state/mint/actions'

function ConfirmAddModalBottom({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd,
}: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount }
  poolTokenPercentage?: Percent
  onAdd: () => void
}) {
  const { t } = useTranslation()
  return (
    <>
      <RowBetween>
        <Text fontSize="15px" fontWeight={600}>
          {t('%asset% Deposited', { asset: currencies[Field.CURRENCY_A]?.symbol })}
        </Text>
        <RowFixed>
          <Text fontSize="15px">{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</Text>
          <CurrencyLogo size="16px" currency={currencies[Field.CURRENCY_A]} style={{ marginLeft: '8px' }} />
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Text fontSize="15px" fontWeight={600}>
          {t('%asset% Deposited', { asset: currencies[Field.CURRENCY_B]?.symbol })}
        </Text>
        <RowFixed>
          <Text fontSize="15px">{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</Text>
          <CurrencyLogo size="16px" currency={currencies[Field.CURRENCY_B]} style={{ marginLeft: '8px' }} />
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Text fontSize="15px" fontWeight={600}>
          {t('Rates')}
        </Text>
        <Text>
          {`1 ${currencies[Field.CURRENCY_A]?.symbol} = ${price?.toSignificant(4)} ${
            currencies[Field.CURRENCY_B]?.symbol
          }`}
        </Text>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end' }}>
        <Text fontSize="15px">
          {`1 ${currencies[Field.CURRENCY_B]?.symbol} = ${price?.invert().toSignificant(4)} ${
            currencies[Field.CURRENCY_A]?.symbol
          }`}
        </Text>
      </RowBetween>
      <RowBetween>
        <Text fontSize="15px" fontWeight={600}>
          {t('Share of Pool')}:
        </Text>
        <Text fontSize="15px">{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</Text>
      </RowBetween>
      <Button onClick={onAdd} mt="20px" width="100%" variant="primaryGradient">
        {noLiquidity ? t('Create Pool & Supply') : t('Confirm Supply')}
      </Button>
    </>
  )
}

export default ConfirmAddModalBottom
