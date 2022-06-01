export interface ApyCalculatorModalProps {
  onDismiss?: () => void
  symbol: string
  tokenPrice: number
  apr: number
  displayApr?: string
  linkLabel: string
  linkHref: string
  earningTokenSymbol?: string
  roundingDecimals?: number
  compoundFrequency?: number
  performanceFee?: number
  isFarm?: boolean
}
