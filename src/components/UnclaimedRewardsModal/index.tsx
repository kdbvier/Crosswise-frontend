import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Text, Modal, InjectedModalProps, useModal } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { formatDate } from 'utils/formatDate'
import { Container, FlexBox, Divider, StyledBtn, Common, StyledSpan } from './styled'
import SettingsModal from '../SettingsModal'

interface UnclaimedRewardsModalProps extends InjectedModalProps {
  pairName: string
  pendingCrss: BigNumber
  collectOption: {
    isVest: boolean
    isAuto: boolean
  }
  onHandleClaim?: any
  onHandleSetting?: any
}

const UnclaimedRewardsModal: React.FC<UnclaimedRewardsModalProps> = ({
  onDismiss,
  pairName,
  pendingCrss,
  collectOption,
  onHandleClaim,
  onHandleSetting,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const [onPresentWalletModal] = useModal(
    <SettingsModal pairName={pairName} values={collectOption} onHandleSetting={onHandleSetting} />,
  )

  const pendingCrssDisplay = pendingCrss.toFixed(5)

  const rawBonusCrss = pendingCrss.div(3)
  const bonusCrssDisplay = rawBonusCrss.toFixed(5)

  const rawTotalRewardsCrss = pendingCrss.plus(rawBonusCrss)
  const totalRewardsCrssDisplay = rawTotalRewardsCrss.toFixed(5)

  const rawEveryMonthCrss = rawTotalRewardsCrss.div(10)
  const everyMonthCrssDisplay = rawEveryMonthCrss.toFixed(5)

  const limitDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 150)

  const handleClaim = async () => {
    if (!onHandleClaim) return
    setPendingTx(true)
    try {
      await onHandleClaim()
      toastSuccess(t('Claimed!'), t('Your rewards have been claimed'))
      onDismiss()
    } catch (e) {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      console.error(e)
    } finally {
      setPendingTx(false)
    }
  }

  return (
    <Modal minWidth="300px" maxWidth="550px" width="100%" onDismiss={onDismiss}>
      <Container>
        <Text fontSize="24px">{t('Unclaimed Rewards')}</Text>
        <Common>
          <Text>{t('Unlocked Rewards Balance')}</Text>
          <FlexBox flexDirection="column">
            <Text>{`${pendingCrssDisplay} CRSS`}</Text>
            <Text>{`~${pendingCrssDisplay} USD`}</Text>
          </FlexBox>
        </Common>
        <Divider />
        <Common>
          <Text textAlign="center">{t('Select Reward Vesting')}</Text>
          <Text margin={10} fontSize="20px" textAlign="center">
            {t('5 Months')}
          </Text>
        </Common>
        <Common>
          {collectOption.isVest ? (
            <Text textAlign="center">{`Rewards Unlock: ${everyMonthCrssDisplay} CRSS every 30 days until ${formatDate(
              limitDate,
            )}`}</Text>
          ) : (
            <Text>
              <StyledSpan onClick={onPresentWalletModal}>Enable Reward Vesting</StyledSpan> to earn your Vesting Bonus
            </Text>
          )}
          <FlexBox flexDirection="column">
            <Text>{t('Bonus')}</Text>
            <Text>{`${bonusCrssDisplay} CRSS ~ ${bonusCrssDisplay} USD`}</Text>
          </FlexBox>
          <FlexBox flexDirection="column">
            <Text>{t('Total Rewards')}</Text>
            <Text>{`${totalRewardsCrssDisplay} CRSS ~ ${totalRewardsCrssDisplay} USD`}</Text>
          </FlexBox>
        </Common>
        <StyledBtn variant="primaryGradient" disabled={pendingTx} onClick={handleClaim}>
          {t('Claim')}
        </StyledBtn>
      </Container>
    </Modal>
  )
}

export default UnclaimedRewardsModal
