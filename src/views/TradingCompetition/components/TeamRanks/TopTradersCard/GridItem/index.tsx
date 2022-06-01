import React from 'react'
import { Heading, Text, Flex } from '@crosswise/uikit'
import truncateWalletAddress from 'utils/truncateWalletAddress'
import { LeaderboardDataItem } from '../../../../types'
import { localiseTradingVolume } from '../../../../helpers'
import { Wrapper, TeamImageWrapper } from './styled'

const GridItem: React.FC<{
  traderData?: LeaderboardDataItem
  teamImages: React.ReactNode[]
}> = ({ traderData = { address: '', volume: 0, teamId: 0, rank: 0 }, teamImages }) => {
  const { address, volume, teamId, rank } = traderData

  return (
    <Wrapper>
      <Flex ml={['4px', '8px', '16px']} alignItems="center" justifyContent="flex-start">
        <Heading color="secondary">#{rank}</Heading>
      </Flex>
      <Flex alignItems="center" justifyContent="flex-start">
        <Text bold>${localiseTradingVolume(volume)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="flex-start">
        <Text color="primary">{truncateWalletAddress(address)}</Text>
      </Flex>
      <TeamImageWrapper justifyContent="flex-end">{teamImages[teamId - 1]}</TeamImageWrapper>
    </Wrapper>
  )
}

export default GridItem
