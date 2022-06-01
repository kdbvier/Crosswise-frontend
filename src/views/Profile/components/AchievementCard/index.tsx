import React from 'react'
import { Flex, PrizeIcon, Text } from '@crosswise/uikit'
import { Achievement } from 'state/types'
import AchievementAvatar from '../AchievementAvatar'
import AchievementTitle from '../AchievementTitle'
import AchievementDescription from '../AchievementDescription'
import { Details } from './styled'

interface AchievementCardProps {
  achievement: Achievement
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  return (
    <Flex>
      <AchievementAvatar badge={achievement.badge} />
      <Details>
        <AchievementTitle title={achievement.title} />
        <AchievementDescription description={achievement.description} />
      </Details>
      <Flex alignItems="center">
        <PrizeIcon width="18px" color="textSubtle" mr="4px" />
        <Text color="textSubtle">{achievement.points.toLocaleString()}</Text>
      </Flex>
    </Flex>
  )
}

export default AchievementCard
