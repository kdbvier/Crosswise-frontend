import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Text, DexIcon } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { usePriceCrssBusd } from 'state/farms/hooks'
import useTVL from 'hooks/useTvl'
import MarketCap from '../StatisticComponents/MarketCap'
import Circulation from '../StatisticComponents/Circulation'
import { Container, SubColumn, StyledButton, StyledTitle, StyledValue, SubColumnTitle, StyledFlex } from './styled'

const AboutCrss = () => {
  const { t } = useTranslation()
  const tvlData = useTVL()
  const crssTokenPrice = usePriceCrssBusd().toNumber()
  const tempValue = useSelector((state) => {
    console.log('whole-state: ', state)
    return state
  })
  return (
    <Container>
      <SubColumnTitle>
        <Text fontSize="10px" color="homeTitle" display="flex" fontWeight={600}>
          {t('DEX STATS')} &nbsp; <DexIcon fill="primaryText" width="15px" />
        </Text>
        <Text fontSize="24px" fontWeight={600} lineHeight="29px" mt={10}>
          &nbsp;
        </Text>
      </SubColumnTitle>
      <SubColumn>
        <StyledTitle>{t('Volume 24h')}</StyledTitle>
        <StyledValue>$ 1,000,999</StyledValue>
      </SubColumn>
      <SubColumn>
        <StyledTitle>{t('Price')}</StyledTitle>
        <StyledValue>$ {crssTokenPrice.toFixed(2)}</StyledValue>
      </SubColumn>
      <SubColumn>
        <StyledTitle>{t('Market Cap')}</StyledTitle>
        <StyledValue>
          <MarketCap />
        </StyledValue>
      </SubColumn>
      <SubColumn span={2}>
        <StyledTitle>{t('Circulating Supply')}</StyledTitle>
        <StyledValue>
          <Circulation />
        </StyledValue>
      </SubColumn>
      <SubColumn>
        <StyledTitle>{t('TVL')}</StyledTitle>
        <StyledValue>${tvlData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</StyledValue>
      </SubColumn>
      <StyledFlex>
        <RouterLink to="/exchange">
          <StyledButton variant="primaryGradient">{t('Buy CRSS')}</StyledButton>
        </RouterLink>
      </StyledFlex>
    </Container>
  )
}

export default AboutCrss
