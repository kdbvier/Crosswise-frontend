import React from 'react'
import { Flex, Text, Heading, Image } from '@crosswise/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import AllBunniesImage from '../../pngs/all-bunnies.png'
import { Heading1Text, Heading2Text } from '../CompetitionHeadingText'
import { TextStyles, ImageWrapper, StyledText, StyledHeading1Text, StyledHeading2Text, StyledHeading } from './styled'

const BattleBanner = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <Flex flexDirection="column">
      <ImageWrapper>
        <Image src={AllBunniesImage} alt="all the bunnies" width={1208} height={659} />
      </ImageWrapper>
      <StyledText mb="16px" color="textSubtle" bold>
        {t('April')} 07—14, 2021
      </StyledText>
      <StyledHeading1Text>{t('Easter Battle')}</StyledHeading1Text>
      <StyledHeading2Text background={theme.colors.gradients.blue} $fill>
        {t('$200,000 in Prizes!')}
      </StyledHeading2Text>
      <StyledHeading scale="md" color={theme.isDark ? 'textSubtle' : 'inputSecondary'} mt="16px">
        {t('Compete with other teams to win CAKE, collectible NFTs, achievements & more!')}
      </StyledHeading>
    </Flex>
  )
}

export default BattleBanner
