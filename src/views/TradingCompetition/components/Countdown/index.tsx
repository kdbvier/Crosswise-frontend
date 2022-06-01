import React from 'react'
import { Flex, Skeleton, PocketWatchIcon, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import getTimePeriods from 'utils/getTimePeriods'
import { CompetitionSteps, LIVE } from 'config/constants/trading-competition/easterPhases'
import useTheme from 'hooks/useTheme'
import { CompetitionPhaseProps } from '../../types'
import Timer from './Timer'
import ProgressStepper from './ProgressStepper'
import { Wrapper, PocketWatchWrapper, StyledHeading } from './styled'

const Countdown: React.FC<{ currentPhase: CompetitionPhaseProps; hasCompetitionEnded: boolean }> = ({
  currentPhase,
  hasCompetitionEnded,
}) => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const finishMs = currentPhase.ends
  const currentMs = Date.now()
  const secondsUntilNextEvent = (finishMs - currentMs) / 1000

  const { minutes, hours, days } = getTimePeriods(secondsUntilNextEvent)

  const renderTimer = () => {
    if (hasCompetitionEnded) {
      return (
        <StyledHeading background={theme.colors.gradients.blue} $fill>
          {t('Finished')}!
        </StyledHeading>
      )
    }
    return (
      <Timer
        prefix={currentPhase.state === LIVE ? `${t('End')}:` : `${t('Start')}:`}
        minutes={minutes}
        hours={hours}
        days={days}
        HeadingTextComponent={({ children }) => (
          <StyledHeading background={theme.colors.gradients.blue} $fill>
            {children}
          </StyledHeading>
        )}
        BodyTextComponent={({ children }) => (
          <Text bold color="#ffff" fontSize="16px" mr={{ _: '8px', sm: '16px' }}>
            {children}
          </Text>
        )}
      />
    )
  }

  return (
    <Wrapper>
      <PocketWatchWrapper>
        <PocketWatchIcon />
      </PocketWatchWrapper>
      <Flex flexDirection="column" justifyContent="center">
        {!secondsUntilNextEvent ? (
          <Skeleton height={26} width={190} mb="24px" />
        ) : (
          <Flex mb="24px" justifyContent="center" alignItems="center">
            {renderTimer()}
          </Flex>
        )}
        {!secondsUntilNextEvent ? (
          <Skeleton height={42} width={190} />
        ) : (
          <ProgressStepper steps={CompetitionSteps} activeStepIndex={currentPhase.step.index} />
        )}
      </Flex>
    </Wrapper>
  )
}

export default Countdown
