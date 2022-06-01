import React from 'react'
import { Flex, HelpIcon, IconButton } from '@crosswise/uikit'
import FlexRow from '../FlexRow'
import { PricePairLabel, TimerLabel } from '../Label'
import PrevNextNav from '../PrevNextNav'
import HistoryButton from '../HistoryButton'
import { SetCol, HelpButtonWrapper, TimerLabelWrapper, HistoryButtonWrapper } from './styled'

const Menu = () => {
  return (
    <FlexRow alignItems="center" p="16px">
      <SetCol>
        <PricePairLabel />
      </SetCol>
      <FlexRow justifyContent="center">
        <PrevNextNav />
      </FlexRow>
      <SetCol>
        <Flex alignItems="center" justifyContent="flex-end">
          <TimerLabelWrapper>
            <TimerLabel interval="5" unit="m" />
          </TimerLabelWrapper>
          <HelpButtonWrapper>
            <IconButton
              variant="subtle"
              as="a"
              href="https://docs.pancakeswap.finance/products/prediction"
              target="_blank"
              rel="noreferrer noopener"
            >
              <HelpIcon width="24px" color="white" />
            </IconButton>
          </HelpButtonWrapper>
          <HistoryButtonWrapper>
            <HistoryButton />
          </HistoryButtonWrapper>
        </Flex>
      </SetCol>
    </FlexRow>
  )
}

export default Menu
