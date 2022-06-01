import React from 'react'
import styled from 'styled-components'
import { Flex } from '@crosswise/uikit'
import PrizesText from './PrizesText'
import PrizesCard from './PrizesCard'
import { Wrapper } from './styled'

const PrizesInfo = () => {
  return (
    <Wrapper flexDirection="column">
      <PrizesCard />
      <PrizesText />
    </Wrapper>
  )
}

export default PrizesInfo
