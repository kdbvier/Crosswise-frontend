import React from 'react'
import { Text, Heading, Image } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import FlipperBunny from '../../../pngs/flippers.png'
import { StyledFlex, ImageWrapper } from './styled'

const PrizesText = () => {
  const { t } = useTranslation()

  return (
    <StyledFlex flexDirection="column" mb="32px">
      <Text mb="24px">{t('Every eligible participant will win prizes at the end of the competition.')}</Text>
      <Heading color="secondary" mb="24px" scale="lg">
        {t('The better your team performs, the better prizes you will get!')}
      </Heading>
      <Text>
        {t(
          'The final winning team will be the team with the highest total combined volume of their top 500 members at the end of the competition period.',
        )}
      </Text>
      <ImageWrapper>
        <Image src={FlipperBunny} alt="Flipper bunny" width={499} height={400} />
      </ImageWrapper>
    </StyledFlex>
  )
}

export default PrizesText
