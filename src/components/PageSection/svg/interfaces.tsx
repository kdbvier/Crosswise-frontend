import { ClipFill } from '../types'

export interface CurveProps {
  clipFill?: ClipFill
}

export interface ContainerProps extends CurveProps {
  clipPath: string
}
