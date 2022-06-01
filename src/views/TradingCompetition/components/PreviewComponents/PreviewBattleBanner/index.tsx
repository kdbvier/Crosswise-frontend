import React from 'react'
import { Flex, Image } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import AllBunniesImage from '../../../pngs/all-bunnies.png'
import { ImageWrapper, StyledHeading1Text, StyledHeading2Text, StyledHeading } from './styled'

const BattleBanner = () => {
  const { t } = useTranslation()
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <ImageWrapper>
        <Image src={AllBunniesImage} alt="all the bunnies" width={1208} height={659} />
      </ImageWrapper>
      <StyledHeading1Text>{t('Easter Battle')}</StyledHeading1Text>
      <StyledHeading2Text background="linear-gradient(180deg, #FFD800 0%, #EB8C00 100%)" $fill>
        {t('$200,000 in Prizes!')}
      </StyledHeading2Text>
      <StyledHeading scale="md" color="inputSecondary" mt="16px">
        {t('Registration starting April 5')}
      </StyledHeading>
    </Flex>
  )
}

export default BattleBanner
