export type TxTokenTypes = {
  symbol: string
  address: string
}

export type SimpleOrderTxTypes = {
  isBuy: boolean
  tradeFrom: TxTokenTypes
  amountFrom: number
  tradeTo: TxTokenTypes
  amountTo: number
  txDate: string
  txLink: string
}
