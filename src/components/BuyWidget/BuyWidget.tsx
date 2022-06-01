import React, { useState } from 'react'
import { TabMenu, Tab } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import CryptoTab from './CryptoTab'
import FiatTab from './FiatTab'
import { BuyWidgetContainer, BuyWidgetBodyContainer, FooterPanel } from './styled'

interface Props {
  temp?: string
}

enum Tabs {
  Crypto = 0,
  Fiat,
}

const BuyModal: React.FC<Props> = () => {
  const [tab, setTab] = useState(0)

  const { t } = useTranslation()

  return (
    <BuyWidgetContainer flexDirection="column">
      <TabMenu variant="primaryGradient" activeIndex={tab} onItemClick={setTab} fullWidth>
        <Tab>{t('With Crypto')}</Tab>
        <Tab>{t('With Fiat')}</Tab>
      </TabMenu>
      <BuyWidgetBodyContainer>
        {tab === Tabs.Crypto && <CryptoTab />}
        {tab === Tabs.Fiat && <FiatTab />}
      </BuyWidgetBodyContainer>
      <FooterPanel>{t('Commission 14 CRSS')}</FooterPanel>
    </BuyWidgetContainer>
  )
}

export default BuyModal
