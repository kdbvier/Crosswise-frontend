import { BoxProps } from '@crosswise/uikit'

export interface Props extends BoxProps {
  text: string | React.ReactNode
  icon?: 'help' | 'info'
}
