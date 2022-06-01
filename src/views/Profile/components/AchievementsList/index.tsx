import React from 'react'
import { Flex, Heading } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { useAchievements } from 'state/achievements/hooks'
import AchievementCard from '../AchievementCard'
import { Grid } from './styled'

const AchievementsList = () => {
  const { t } = useTranslation()
  const achievements = useAchievements()

  return (
    <>
      <Grid>
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </Grid>
      {achievements.length === 0 && (
        <Flex alignItems="center" justifyContent="center" style={{ height: '64px' }}>
          <Heading as="h5" scale="md" color="textDisabled">
            {t('No achievements yet!')}
          </Heading>
        </Flex>
      )}
    </>
  )
}

export default AchievementsList
