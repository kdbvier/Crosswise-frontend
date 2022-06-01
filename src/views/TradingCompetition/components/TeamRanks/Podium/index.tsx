import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { Flex, Box, Text, Skeleton } from '@crosswise/uikit'
import TeamPodiumIcon from './TeamPodiumIcon'
import { PodiumBase } from '../../../svgs'
import { TeamLeaderboardProps } from '../../../types'
import { localiseTradingVolume } from '../../../helpers'
import { Wrapper, Inner, LeftBox, MiddleBox, RightBox, StyledVolumeFlex, StyledVolumeText } from './styled'

interface PodiumProps {
  teamsSortedByVolume?: Array<TeamLeaderboardProps>
}

const Podium: React.FC<PodiumProps> = ({ teamsSortedByVolume }) => {
  const { t } = useTranslation()
  const firstTeam = teamsSortedByVolume && teamsSortedByVolume[0]
  const secondTeam = teamsSortedByVolume && teamsSortedByVolume[1]
  const thirdTeam = teamsSortedByVolume && teamsSortedByVolume[2]

  return (
    <Wrapper>
      <Inner>
        <Flex height="132px" position="relative">
          <LeftBox>
            <TeamPodiumIcon teamId={secondTeam && secondTeam.teamId} teamPosition={2} />
          </LeftBox>
          <MiddleBox>
            <TeamPodiumIcon teamId={firstTeam && firstTeam.teamId} teamPosition={1} />
          </MiddleBox>
          <RightBox>
            <TeamPodiumIcon teamId={thirdTeam && thirdTeam.teamId} teamPosition={3} />
          </RightBox>
        </Flex>
        <PodiumBase />
        <Flex justifyContent="space-between" mt="8px">
          <StyledVolumeFlex>
            {secondTeam ? (
              <StyledVolumeText bold>${localiseTradingVolume(secondTeam.leaderboardData.volume)}</StyledVolumeText>
            ) : (
              <Skeleton width="77px" height="24px" />
            )}
            <Text fontSize="12px" color="textSubtle">
              {t('Volume')}
            </Text>
          </StyledVolumeFlex>
          <StyledVolumeFlex>
            {firstTeam ? (
              <StyledVolumeText bold>${localiseTradingVolume(firstTeam.leaderboardData.volume)}</StyledVolumeText>
            ) : (
              <Skeleton width="77px" height="24px" />
            )}
            <Text fontSize="12px" color="textSubtle">
              {t('Volume')}
            </Text>
          </StyledVolumeFlex>
          <StyledVolumeFlex>
            {thirdTeam ? (
              <StyledVolumeText bold>${localiseTradingVolume(thirdTeam.leaderboardData.volume)}</StyledVolumeText>
            ) : (
              <Skeleton width="77px" height="24px" />
            )}
            <Text fontSize="12px" color="textSubtle">
              {t('Volume')}
            </Text>
          </StyledVolumeFlex>
        </Flex>
      </Inner>
    </Wrapper>
  )
}

export default Podium
