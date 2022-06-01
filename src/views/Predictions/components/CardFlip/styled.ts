import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface CardFlipProps {
  isFlipped: boolean
  height: string
  children: [ReactNode, ReactNode]
}

export const Front = styled.div`
  align-items: center;
  backface-visibility: hidden;
  display: flex;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: z-index 600ms;
  width: 100%;

  & > div {
    flex: 1;
  }
`

export const Back = styled(Front)`
  transform: rotateY(180deg);
`

export const Inner = styled.div<{ isFlipped: CardFlipProps['isFlipped'] }>`
  height: 100%;
  position: relative;
  transform: rotateY(${({ isFlipped }) => (isFlipped ? 180 : 0)}deg);
  transform-style: preserve-3d;
  transition: transform 600ms;

  ${Front} {
    z-index: ${({ isFlipped }) => (isFlipped ? 5 : 10)};
  }

  ${Back} {
    z-index: ${({ isFlipped }) => (isFlipped ? 10 : 5)};
  }
`

export const StyledCardFlip = styled.div`
  perspective: 1000px;
  z-index: auto;
`
