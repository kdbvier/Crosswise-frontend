import React from 'react'
import { Image, Content, StyledCardContent } from './styled'

const CardContent = ({ imgSrc, children }) => {
  return (
    <StyledCardContent>
      <Image src={imgSrc} alt="card icon" />
      <Content>{children}</Content>
    </StyledCardContent>
  )
}

export default CardContent
