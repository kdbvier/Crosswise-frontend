import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Front, Back, Inner, StyledCardFlip } from './styled'

interface CardFlipProps {
  isFlipped: boolean
  height: string
  children: [ReactNode, ReactNode]
}

const getComponents = (children: CardFlipProps['children']) => {
  if (children.length !== 2) {
    throw new Error('CardFlip: Two children are required')
  }

  return children
}

const CardFlip: React.FC<CardFlipProps> = ({ isFlipped, height, children }) => {
  const [front, back] = getComponents(children)

  return (
    <StyledCardFlip style={{ height }}>
      <Inner isFlipped={isFlipped}>
        <Front>{front}</Front>
        <Back>{back}</Back>
      </Inner>
    </StyledCardFlip>
  )
}

export default CardFlip
