import React from 'react'
import { Text, Flex } from '@crosswise/uikit'
import truncateWalletAddress from 'utils/truncateWalletAddress'
import { LeaderboardDataItem } from '../../../../types'
import { localiseTradingVolume } from '../../../../helpers'
import { Wrapper, VolumeAddressWrapper, VolumeText, TeamImageWrapper } from './styled'

const GridItem: React.FC<{ traderData?: LeaderboardDataItem; teamImages: React.ReactNode[] }> = ({
  traderData = { address: '', volume: 0, teamId: 0, rank: 0 },
  teamImages,
}) => {
  const { address, volume, teamId, rank } = traderData

  return (
    <Wrapper>
      <Flex ml={['4px', '8px', '16px']} alignItems="center" justifyContent="flex-start">
        <Text fontSize="16px" bold color="secondary">
          #{rank}
        </Text>
      </Flex>
      <VolumeAddressWrapper>
        <Flex alignItems="center" justifyContent="flex-start">
          <VolumeText fontSize="12px" bold>
            ${localiseTradingVolume(volume)}
          </VolumeText>
        </Flex>
        <Flex alignItems="center" justifyContent="flex-start">
          <Text color="primary" fontSize="12px">
            {truncateWalletAddress(address)}
          </Text>
        </Flex>
      </VolumeAddressWrapper>
      <TeamImageWrapper justifyContent="flex-end">{teamImages[teamId - 1]}</TeamImageWrapper>
    </Wrapper>
  )
}

export default GridItem
