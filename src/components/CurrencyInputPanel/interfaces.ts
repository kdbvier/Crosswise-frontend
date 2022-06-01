import { ReactElement } from 'react'
import { Currency, Pair } from '@crosswise/sdk'

export interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onChangeAmount?: (percentage: number) => void
  showMaxButton: boolean
  label?: string
  labelFontSize?: string
  onCurrencySelect: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  customOperationRender?: () => ReactElement
}
