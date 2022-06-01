import React from 'react'
// import { Box, Flex, TabMenu, Tab, useMatchBreakpoints } from '@crosswise/uikit'
import { Box, Flex, TabMenu, Tab } from '@crosswise/uikit'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import Page from '../Page'
import { Chart, LimitOrderCryptoPanel } from './Components'
import LimitOrderTable from './Components/LimitOrderTable'
import {
  BuyWidgetContainer,
  LayoutContainer,
  TabMenuWrapper,
  // StyledCard,
  StyledMainCard,
} from './styled'

export default function LimitOrderBook() {
  const { t } = useTranslation()
  const history = useHistory()

  const handleTabClick = (idx: number) => {
    if (idx === 0) history.push('/exchange')
    else if (idx === 1) history.push('/liquidity')
  }

  return (
    <Page subTitle="Place a limit order to trade at a set price">
      <TabMenuWrapper>
        <TabMenu activeIndex={2} variant="primaryGradient" onItemClick={handleTabClick} fullWidth>
          <Tab>{t('Exchange')}</Tab>
          <Tab>{t('Liquidity')}</Tab>
          <Tab>{t('Limit')}</Tab>
          <Tab>{t('Bridge')}</Tab>
        </TabMenu>
      </TabMenuWrapper>
      <LayoutContainer justifyItems="stretch">
        <Flex width="100%" flexDirection="column">
          <Box>
            <StyledMainCard>
              <Chart />
            </StyledMainCard>
          </Box>
          <Box>
            <LimitOrderTable isCompact />
          </Box>
        </Flex>

        <BuyWidgetContainer>
          <LimitOrderCryptoPanel />
        </BuyWidgetContainer>
      </LayoutContainer>
    </Page>
  )
}
