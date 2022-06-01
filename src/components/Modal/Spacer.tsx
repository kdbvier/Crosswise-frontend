import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { SpacerProps } from './interfaces'
import { StyledSpacer } from './styled'

const Spacer: React.FC<SpacerProps> = ({ size = 'md' }) => {
  const { spacing } = useContext(ThemeContext)

  let s: number
  switch (size) {
    case 'lg':
      s = spacing[6]
      break
    case 'sm':
      s = spacing[2]
      break
    case 'md':
    default:
      s = spacing[4]
  }

  return <StyledSpacer size={s} />
}

export default Spacer
