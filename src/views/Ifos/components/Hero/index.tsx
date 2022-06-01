import React from 'react'
import { Box, Heading, Text } from '@crosswise/uikit'
import Container from 'components/Layout/Container'
import { useTranslation } from 'contexts/Localization'
import { StyledHero, CurtainBottom } from './styled'

const Hero = () => {
  const { t } = useTranslation()

  return (
    <Box mb="32px">
      <StyledHero>
        <Container>
          <Heading as="h1" scale="xl" mb="24px">
            {t('IFO: Initial Farm Offerings')}
          </Heading>
          <Text bold fontSize="20px">
            {t('Buy new tokens with a brand new token sale model.')}
          </Text>
        </Container>
      </StyledHero>
      <CurtainBottom />
    </Box>
  )
}

export default Hero
