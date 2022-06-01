import { Currency, Token } from '@crosswise/sdk'
import { InjectedModalProps } from '@crosswise/uikit'
import { TokenList } from '@uniswap/token-lists'

export interface CurrencySearchProps {
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  showImportView: () => void
  setImportToken: (token: Token) => void
}

export interface CurrencySearchModalProps extends InjectedModalProps {
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
}

export interface ImportProps {
  listURL: string
  list: TokenList
  onImport: () => void
}
