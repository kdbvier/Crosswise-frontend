import React from 'react'
import styled from 'styled-components'
import { Card, CardHeader, CardBody, CommunityIcon, Heading, PrizeIcon, Text } from '@crosswise/uikit'
import { Team } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import ComingSoon from 'views/Profile/components/ComingSoon'
import StatBox from 'views/Profile/components/StatBox'
import { Wrapper, Avatar, AvatarWrap, StyledCard, StyledCardHeader, TeamName, StatRow } from './styled'

interface TeamCardProps {
  team: Team
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <StyledCard>
        <StyledCardHeader bg={`/images/teams/${team.background}`}>
          <AvatarWrap>
            <Avatar src={`/images/teams/${team.images.md}`} alt="team avatar" />
          </AvatarWrap>
          <TeamName color={team.textColor}>{team.name}</TeamName>
          <Text as="p" color={team.textColor}>
            {t(team.description)}
          </Text>
        </StyledCardHeader>
        <CardBody>
          <StatRow>
            <StatBox icon={CommunityIcon} title={team.users} subtitle={t('Active Members')} />
            <StatBox icon={PrizeIcon} title={t('Coming Soon')} subtitle={t('Team Points')} isDisabled />
          </StatRow>
          <Heading as="h3">{t('Team Achievements')}</Heading>
          <ComingSoon />
        </CardBody>
      </StyledCard>
    </Wrapper>
  )
}

export default TeamCard
