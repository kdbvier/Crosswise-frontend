import { ReactNode } from 'react'

export interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string
  children?: ReactNode
  noConfig?: boolean
  hideBorder?: boolean
}
