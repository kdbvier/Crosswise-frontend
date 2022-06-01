import React from 'react'
import { RibbonProps } from '../../types'
import Ribbon from '../Ribbon'
import { Wrapper, Spacer, AbsoluteImageWrapper, RibbonWrapper } from './styled'

const RibbonWithImage: React.FC<RibbonProps> = ({
  imageComponent,
  ribbonDirection = 'down',
  children,
  isCardHeader,
}) => {
  const marginBottom = () => {
    if (isCardHeader) {
      return '36px'
    }

    if (ribbonDirection === 'down') {
      return '66px'
    }

    return '50px'
  }

  return (
    <Wrapper alignItems="center" justifyContent="center" marginBottom={marginBottom()}>
      {isCardHeader ? (
        <>
          <Spacer />
          <AbsoluteImageWrapper>{imageComponent}</AbsoluteImageWrapper>
        </>
      ) : (
        imageComponent
      )}
      <RibbonWrapper alignItems="center" justifyContent="center" ribbonDirection={ribbonDirection}>
        <Ribbon ribbonDirection={ribbonDirection}>{children}</Ribbon>
      </RibbonWrapper>
    </Wrapper>
  )
}

export default RibbonWithImage
