import { CardProps } from '@crosswise/uikit'
import { Pair } from '@crosswise/sdk'

export interface PositionCardProps extends CardProps {
  pair: Pair
  showUnwrapped?: boolean
}
