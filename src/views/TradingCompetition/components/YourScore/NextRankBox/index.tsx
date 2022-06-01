import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Flex, Text, FlexProps, ArrowForwardIcon } from '@crosswise/uikit'
import { Wrapper, MedalsWrapper, ArrowWrapper } from './styled'

interface NextRankProps extends FlexProps {
  title?: string
  footer?: string
  hideArrow?: boolean
  nextMedal?: ReactElement
  currentMedal?: ReactElement
}

const NextRank: React.FC<NextRankProps> = ({
  title = '',
  footer,
  currentMedal,
  nextMedal,
  hideArrow = false,
  children,
  ...props
}) => {
  return (
    <Wrapper {...props}>
      <Flex flexDirection="column" mr={['8px', '24px']}>
        <Text mb="8px" fontSize="12px" bold color="textSubtle">
          {title}
        </Text>
        {children}
        <Text mt="8px" fontSize="12px" color="textSubtle">
          {footer}
        </Text>
      </Flex>
      <Flex flexDirection="column">
        <MedalsWrapper>
          {currentMedal}
          {hideArrow ? null : (
            <ArrowWrapper>
              <ArrowForwardIcon />
            </ArrowWrapper>
          )}
          {nextMedal}
        </MedalsWrapper>
      </Flex>
    </Wrapper>
  )
}

export default NextRank
