import React from 'react'
import useTheme from 'hooks/useTheme'
import { useMatchBreakpoints } from '@crosswise/uikit'

import {
  StarsWrapper,
  Star,
  Planet,
  Satellite,
  BackgroundWrapper,
  SatelliteWrapper,
  BackgroundCell,
  // Twinkling,
  // SparklingStars,
} from './styled'
import { BackgroundEffectProps } from './interfaces'

const ROW_COL_BACKGROUNDCELL_COUNTS = 10

const random = (min, max) => {
  const rand = Math.random()
  const result = min + Math.floor(rand * (max - min + 1))
  return result
}

const Stars: React.FunctionComponent<BackgroundEffectProps> = React.memo(({ starCounts }) => {
  const { theme } = useTheme()
  const { isXs, isSm, isMd } = useMatchBreakpoints()
  const starContent = []
  for (let i = 0; i < starCounts; i++) {
    starContent.push(<Star key={i} random={random} />)
  }

  const backgroundCells = []
  for (let i = 0; i < ROW_COL_BACKGROUNDCELL_COUNTS * ROW_COL_BACKGROUNDCELL_COUNTS; i++) {
    backgroundCells.push(
      <BackgroundCell
        key={i}
        row={Math.floor(i / ROW_COL_BACKGROUNDCELL_COUNTS)}
        col={i % ROW_COL_BACKGROUNDCELL_COUNTS}
      />,
    )
  }

  const isDisablePlanets = isXs || isSm || isMd

  return (
    <>
      <BackgroundWrapper id="background-wrapper">
        {theme.isDark && (
          <>
            {/* <SparklingStars />
            <Twinkling /> */}
            <StarsWrapper>{starContent}</StarsWrapper>
          </>
        )}
        {!isDisablePlanets && (
          <>
            <Planet imageIndex={9} position="lt" width={500} height={500} random={random} />
            <Planet imageIndex={10} position="lb" width={250} height={235} random={random} />
            <Planet imageIndex={11} position="rt" width={445} height={518} random={random} />
            <Planet
              imageUrl="/images/home/fire/fire.png"
              position="rb"
              width={110}
              height={107}
              random={random}
              notFloat={false}
            />
          </>
        )}
      </BackgroundWrapper>
      {!isDisablePlanets && (
        <SatelliteWrapper rowCols={ROW_COL_BACKGROUNDCELL_COUNTS}>
          {/* {backgroundCells} */}
          <Satellite rowCols={ROW_COL_BACKGROUNDCELL_COUNTS} />
        </SatelliteWrapper>
      )}
    </>
  )
})

export default Stars
