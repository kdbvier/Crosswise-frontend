import React from 'react'
import { Link } from 'react-router-dom'
import { Button, CommunityIcon, Flex, PrizeIcon, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { Team } from 'config/constants/types'
import { TeamRank, Body, Info, Avatar, TeamName, MobileAvatar, DesktopAvatar, StyledTeamCard } from './styled'

interface TeamCardProps {
  rank: number
  team: Team
}

const TeamCard: React.FC<TeamCardProps> = ({ rank, team }) => {
  const { t } = useTranslation()
  const avatar = <Avatar src={`/images/teams/${team.images.md}`} alt="team avatar" />

  return (
    <StyledTeamCard>
      <Flex>
        <TeamRank>
          <Text bold fontSize="24px">
            {rank}
          </Text>
        </TeamRank>
        <Body>
          <Info>
            <Flex alignItems="center" mb="16px">
              <MobileAvatar>{avatar}</MobileAvatar>
              <TeamName>{team.name}</TeamName>
            </Flex>
            <Text as="p" color="textSubtle" pr="24px" mb="16px">
              {t(team.description)}
            </Text>
            <Flex>
              <Flex>
                {/* alignSelf for Safari fix */}
                <PrizeIcon width="24px" mr="8px" style={{ alignSelf: 'center' }} />
                <Text fontSize="24px" bold>
                  {team.points.toLocaleString()}
                </Text>
              </Flex>
              <Flex ml="24px">
                {/* alignSelf for Safari fix */}
                <CommunityIcon width="24px" mr="8px" style={{ alignSelf: 'center' }} />
                <Text fontSize="24px" bold>
                  {team.users.toLocaleString()}
                </Text>
              </Flex>
            </Flex>
          </Info>
          <Button as={Link} to={`/teams/${team?.id}`} variant="secondary" scale="sm">
            {t('See More')}
          </Button>
          <DesktopAvatar>{avatar}</DesktopAvatar>
        </Body>
      </Flex>
    </StyledTeamCard>
  )
}

export default TeamCard
