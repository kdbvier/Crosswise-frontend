import React from 'react'
import styled from 'styled-components'
import { Flex, Text, FlexProps } from '@crosswise/uikit'
import { Wrapper } from './styled'

interface UserRankProps extends FlexProps {
  title?: string
  footer?: string
}

const UserRank: React.FC<UserRankProps> = ({ title = '', footer, children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Text mb="8px" fontSize="12px" bold textAlign="center">
        {title}
      </Text>
      {children}
      <Text mt="8px" fontSize="12px" color="textSubtle" textAlign="center">
        {footer}
      </Text>
    </Wrapper>
  )
}

export default UserRank
