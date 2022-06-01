import { Text } from '@crosswise/uikit'
import { Auction, AuctionStatus } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { StyledRibbon } from './styled'

const AuctionRibbon: React.FC<{ auction: Auction; noAuctionHistory: boolean }> = ({ auction, noAuctionHistory }) => {
  const { t } = useTranslation()
  const { status } = auction

  // Don't show Live or Finished in case of fresh contract with no history
  if (noAuctionHistory) {
    return null
  }

  let ribbonText = t('Finished')
  let color = 'textDisabled'
  if (status === AuctionStatus.Open) {
    ribbonText = `${t('Live')}!`
    color = 'success'
  }
  if (status === AuctionStatus.Pending) {
    ribbonText = `${t('Get ready')}!`
    color = 'warning'
  }
  return (
    <StyledRibbon color={color}>
      <Text color="white" textTransform="uppercase">
        {ribbonText}
      </Text>
    </StyledRibbon>
  )
}

export default AuctionRibbon
