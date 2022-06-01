import React from 'react'
import { useTheme } from 'styled-components'
import { Percent } from '@crosswise/sdk'
import { warningSeverity } from 'utils/prices'
import { ONE_BIPS } from '../../../../config/constants'
import { ErrorText } from '../styleds'

/**
 * Formatted version of price impact text with warning colors
 */
export default function FormattedPriceImpact({ priceImpact }: { priceImpact?: Percent }) {
  const { isDark } = useTheme()
  const severity = warningSeverity(priceImpact)
  return (
    <ErrorText fontSize="13px" severity={severity} gradient={!isDark && severity <= 1 ? 'gradprimary' : ''}>
      {priceImpact ? (priceImpact.lessThan(ONE_BIPS) ? '<0.01%' : `${priceImpact.toFixed(2)}%`) : '-'}
    </ErrorText>
  )
}
