import React from 'react'
import { TrophyGoldIcon } from '@crosswise/uikit'
import { useGetIsClaimable } from 'state/predictions/hooks'
import { useTranslation } from 'contexts/Localization'
import CollectWinningsButton from '../../CollectWinningsButton'
import { Wrapper } from './styled'

interface CollectWinningsOverlayProps {
  epoch: number
  payout: string
  betAmount: string
  isBottom?: boolean
}

const CollectWinningsOverlay: React.FC<CollectWinningsOverlayProps> = ({
  epoch,
  payout,
  betAmount,
  isBottom = false,
  ...props
}) => {
  const { t } = useTranslation()
  const isClaimable = useGetIsClaimable(epoch)

  if (!isClaimable) {
    return null
  }

  return (
    <Wrapper alignItems="center" p="16px" isBottom={isBottom} {...props}>
      <TrophyGoldIcon width="64px" style={{ flex: 'none' }} mr="8px" />
      <CollectWinningsButton payout={payout} betAmount={betAmount} epoch={epoch} hasClaimed={false} width="100%">
        {t('Collect Winnings')}
      </CollectWinningsButton>
    </Wrapper>
  )
}

export default CollectWinningsOverlay
