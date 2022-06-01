import React from 'react'
import { ConcaveTop, ConcaveBottom, ConvexTop, ConvexBottom } from './svg/CurvedSvg'
import { CurvedDividerProps } from './interfaces'
import { Wrapper, ComponentWrapper } from './styled'

const CurvedDivider: React.FC<CurvedDividerProps> = ({
  index,
  dividerPosition,
  dividerComponent,
  concave,
  clipFill,
  dividerFill,
}) => {
  const showConvexTop = dividerPosition === 'top' && !concave
  const showConvexBottom = dividerPosition === 'bottom' && !concave
  const showConcaveTop = dividerPosition === 'top' && concave
  const showConcaveBottom = dividerPosition === 'bottom' && concave

  const getconcaveDivider = () => {
    return (
      <>
        {showConcaveTop && <ConcaveTop clipFill={clipFill} />}
        {showConcaveBottom && <ConcaveBottom clipFill={clipFill} />}
      </>
    )
  }

  const getConvexDivider = () => {
    return (
      <>
        {showConvexTop && <ConvexTop clipFill={clipFill} />}
        {showConvexBottom && <ConvexBottom clipFill={clipFill} />}
      </>
    )
  }

  return (
    <Wrapper index={index} dividerFill={dividerFill}>
      {dividerComponent && <ComponentWrapper index={index}>{dividerComponent}</ComponentWrapper>}
      {getconcaveDivider()}
      {getConvexDivider()}
    </Wrapper>
  )
}

export default CurvedDivider
