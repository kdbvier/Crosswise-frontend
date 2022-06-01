import React from 'react'
import styled from 'styled-components'
import { Flex } from '@crosswise/uikit'
import PrizesText from './PrizesText'
import PrizesCard from './PrizesCard'

export const Wrapper = styled(Flex)`
  flex-direction: column-reverse;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`
