import React from 'react'
import styled from 'styled-components'
import { LogoIcon, CheckmarkCircleIcon, CircleOutlineIcon, Flex, Text } from '@crosswise/uikit'
import { CountdownProps } from '../../../types'
import { ExpiredWrapper, ActiveWrapper, FutureWrapper, StyledText } from './styled'

const Step: React.FC<CountdownProps> = ({ stepText, index, activeStepIndex }) => {
  const isExpired = index < activeStepIndex
  const isActive = index === activeStepIndex
  const isFuture = index > activeStepIndex

  if (isExpired) {
    return (
      <ExpiredWrapper>
        <CheckmarkCircleIcon />
        <StyledText color="textSubtle">{stepText}</StyledText>
      </ExpiredWrapper>
    )
  }

  if (isActive) {
    return (
      <ActiveWrapper>
        <LogoIcon />
        <StyledText color="primaryBright">{stepText}</StyledText>
      </ActiveWrapper>
    )
  }

  if (isFuture) {
    return (
      <FutureWrapper>
        <CircleOutlineIcon />
        <StyledText color="textDisabled">{stepText}</StyledText>
      </FutureWrapper>
    )
  }

  return <span>Er</span>
}

export default Step
