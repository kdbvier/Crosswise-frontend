import React from 'react'
import { GradientProps } from './interfaces'
import { GradientTextContainer } from './styled'

const GradientText: React.FC<GradientProps> = (props) => {
  const { children, ...restProps } = props
  return <GradientTextContainer {...restProps}>{children}</GradientTextContainer>
}

export default GradientText
