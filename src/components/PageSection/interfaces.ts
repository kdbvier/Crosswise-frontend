import { BoxProps, FlexProps } from '@crosswise/uikit'
import { DividerFill, ClipFill } from './types'

export interface CurvedDividerProps extends WrapperProps {
  svgFill?: string
  dividerComponent?: React.ReactNode
  dividerPosition?: 'top' | 'bottom'
  concave?: boolean
  clipFill?: ClipFill
}

export interface WrapperProps {
  index: number
  dividerFill?: DividerFill
}

export interface PageSectionProps extends BackgroundColorProps {
  svgFill?: string
  dividerComponent?: React.ReactNode
  hasCurvedDivider?: boolean
  dividerPosition?: 'top' | 'bottom'
  concaveDivider?: boolean
  containerProps?: BoxProps
  innerProps?: BoxProps
  clipFill?: ClipFill
  dividerFill?: DividerFill
}

export interface BackgroundColorProps extends FlexProps {
  index: number
  background?: string
  getPadding?: () => string
}
