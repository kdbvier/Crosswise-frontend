import React from 'react'
import { Flex } from '@crosswise/uikit'
import Hero from './components/Hero'
import Footer from './components/Footer'
import { Proposals } from './components/Proposals'
import { Chrome, Content } from './styled'

const Voting = () => {
  return (
    <Flex flexDirection="column" minHeight="calc(100vh - 64px)">
      <Chrome>
        <Hero />
      </Chrome>
      <Content>
        <Proposals />
      </Content>
      <Chrome>
        <Footer />
      </Chrome>
    </Flex>
  )
}

export default Voting
