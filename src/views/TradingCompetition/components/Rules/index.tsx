import React from 'react'
import { Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import RulesCard from './RulesCard'
import FAQs from './FAQs'
import { Wrapper, StyledCardWrapper } from './styled'

const Rules = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <StyledCardWrapper>
        <RulesCard title={t('Trade to increase your rank')}>
          <Text textAlign="center" fontSize="14px" color="textSubtle">
            {t('Eligible pairs: BNB/BUSD, CAKE/BNB, ETH/BNB and BTCB/BNB')}
          </Text>
        </RulesCard>
        <RulesCard title={t('Play as a team')}>
          <Text textAlign="center" fontSize="14px" color="textSubtle">
            {t('The higher your team’s rank, the better your prizes!')}
          </Text>
        </RulesCard>
      </StyledCardWrapper>
      <FAQs />
    </Wrapper>
  )
}

export default Rules
