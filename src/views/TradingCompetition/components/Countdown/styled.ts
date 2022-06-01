import React from 'react'
import styled from 'styled-components'
import { Flex, Skeleton, PocketWatchIcon, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import getTimePeriods from 'utils/getTimePeriods'
import { CompetitionSteps, LIVE } from 'config/constants/trading-competition/easterPhases'
import useTheme from 'hooks/useTheme'
import { Heading2Text } from '../CompetitionHeadingText'
import { CompetitionPhaseProps } from '../../types'
import Timer from './Timer'
import ProgressStepper from './ProgressStepper'

export const Wrapper = styled(Flex)`
  width: fit-content;
  height: fit-content;
  background: linear-gradient(180deg, #7645d9 0%, #452a7a 100%);
  border: 1px solid #7645d9;
  box-sizing: border-box;
  border-radius: 0px 0px 24px 24px;
  padding: 16px 18px;
  margin: -30px auto 50px;
  justify-content: space-around;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 16px 24px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: column;
    margin: -38px 0 0 36px;
  }
`

export const PocketWatchWrapper = styled(Flex)`
  align-items: center;
  justify-content: center;
  margin-right: 12px;

  svg {
    height: 48px;
    width: 48px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 24px;

    svg {
      height: 64px;
      width: 64px;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-bottom: 16px;
    margin-right: 0;
  }
`

export const StyledHeading = styled(Heading2Text)`
  font-size: 24px;
  margin-right: 2px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 4px;
  }
`
