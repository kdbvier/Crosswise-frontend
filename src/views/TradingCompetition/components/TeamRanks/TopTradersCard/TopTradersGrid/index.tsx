import React from 'react'
import { Box, Skeleton } from '@crosswise/uikit'
import { LeaderboardDataItem } from '../../../../types'
import GridItem from '../GridItem'
import ExpandedGridItem from '../ExpandedGridItem'
import { LeaderboardStorm, LeaderboardFlippers, LeaderboardCakers } from '../../../../svgs'
import { ExpandedWrapper } from './styled'

const SkeletonLoader = () => {
  return (
    <Box width="100%">
      <Skeleton width="100%" height="76px" m="3px" />
      <Skeleton width="100%" height="76px" m="3px" />
      <Skeleton width="100%" height="76px" m="3px" />
      <Skeleton width="100%" height="76px" m="3px" />
      <Skeleton width="100%" height="76px" m="3px" />
    </Box>
  )
}

const TopTradersGrid: React.FC<{ data?: LeaderboardDataItem[]; isExpanded: boolean }> = ({ data, isExpanded }) => {
  const topFive = data && data.slice(0, 5)
  const nextTwenty = data && data.slice(5, 20)
  const teamImages = [<LeaderboardStorm />, <LeaderboardFlippers />, <LeaderboardCakers />]

  return (
    <Box>
      {data ? (
        <>
          {topFive.map((traderData) => {
            return <GridItem key={traderData.address} traderData={traderData} teamImages={teamImages} />
          })}
          {isExpanded && (
            <ExpandedWrapper>
              {nextTwenty.map((traderData) => {
                return <ExpandedGridItem key={traderData.address} traderData={traderData} teamImages={teamImages} />
              })}
            </ExpandedWrapper>
          )}
        </>
      ) : (
        <SkeletonLoader />
      )}
    </Box>
  )
}

export default TopTradersGrid
