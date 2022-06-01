import React from 'react'
import { ChainId, Currency, currencyEquals, ETHER, Token } from '@crosswise/sdk'
import { Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'

import { SUGGESTED_BASES } from '../../config/constants'
import { AutoColumn } from '../Layout/Column'
import QuestionHelper from '../QuestionHelper'
import { AutoRow } from '../Layout/Row'
import { CurrencyLogo } from '../Logo'
import { BaseWrapper } from './styled'

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
}: {
  chainId?: ChainId
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  const { t } = useTranslation()
  return (
    <AutoColumn gap="md">
      <AutoRow>
        <Text fontSize="14px">{t('Common bases')}</Text>
        <QuestionHelper text={t('These tokens are commonly paired with other tokens.')} ml="4px" />
      </AutoRow>
      <AutoRow gap="auto">
        <BaseWrapper
          onClick={() => {
            if (!selectedCurrency || !currencyEquals(selectedCurrency, ETHER)) {
              onSelect(ETHER)
            }
          }}
          disable={selectedCurrency === ETHER}
        >
          <CurrencyLogo currency={ETHER} style={{ marginRight: 8 }} />
          <Text>BNB</Text>
        </BaseWrapper>
        {(chainId ? SUGGESTED_BASES[chainId] : []).map((token: Token) => {
          const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address
          return (
            <BaseWrapper onClick={() => !selected && onSelect(token)} disable={selected} key={token.address}>
              <CurrencyLogo currency={token} style={{ marginRight: 8 }} />
              <Text>{token.symbol}</Text>
            </BaseWrapper>
          )
        })}
      </AutoRow>
    </AutoColumn>
  )
}
