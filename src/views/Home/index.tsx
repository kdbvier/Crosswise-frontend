import React from 'react'
import Row from 'components/Layout/Row'
import { AutoColumn } from 'components/Layout/Column'
import { Heading, useMatchBreakpoints } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import Chart from './components/BasicChart'
import AboutCrss from './components/AboutCrss'
import Header from './components/Header'
import SocialLink from './components/SocialLink'
import Balances from './components/Balances'
import CardsArea from './components/CardsArea'
import { StyledPage, Label, StyledRow } from './styled'

const Home: React.FC = () => {
  const { t } = useTranslation()
  const { isXs, isSm, isMd } = useMatchBreakpoints()
  const isMobile = isXs || isSm || isMd
  return (
    <>
      <StyledPage>
        <Row justify="center">
          <AutoColumn justify="center">
            <Heading as="h1" scale="xxl" mb="24px" color="text">
              <Header isMobile={isMobile} />
            </Heading>
            <Label color="primaryText" fontSize="20px" textAlign="center">
              {t('Cross-Chain DEX 2.0 With Built-In Tools & Gas Savings')}
            </Label>
            <SocialLink />
          </AutoColumn>
        </Row>
        <Row>
          <AboutCrss />
        </Row>
        <StyledRow>
          <Balances />
          <CardsArea />
        </StyledRow>
        {!isMobile && (
          <StyledRow>
            <Chart />
          </StyledRow>
        )}
      </StyledPage>
    </>
  )
}

export default Home
