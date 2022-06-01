import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Modal, Text, InjectedModalProps, Flex } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { usePriceCrssBusd } from 'state/farms/hooks'
import { useThemeManager } from 'state/user/hooks'
import { insertThousandSeparator } from 'utils/other'
import useToast from 'hooks/useToast'
import { Container, ValueContainer, ActionButton } from './styled'

interface HarvestModalProps extends InjectedModalProps {
  claimedRewards: BigNumber
  onHandleHarvestStake?: any
  onHandleHarvestWithdraw?: any
}

const HarvestModal: React.FC<HarvestModalProps> = ({
  onDismiss,
  claimedRewards,
  onHandleHarvestStake,
  onHandleHarvestWithdraw,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const [isDark] = useThemeManager()
  const crssPrice = usePriceCrssBusd()
  const claimedRewardsDisplay = claimedRewards.toFixed(2)
  const claimedRewardsBusd = claimedRewards.multipliedBy(crssPrice).toFixed(2)

  const handleHarvestStake = async () => {
    if (!onHandleHarvestStake) return
    setPendingTx(true)
    try {
      await onHandleHarvestStake()
      toastSuccess(t('Success!'), t('Successfully harvest and stake.'))
      onDismiss()
    } catch (e) {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      console.error(e)
    } finally {
      setPendingTx(false)
    }
  }

  const handleHarvestWithdraw = async () => {
    if (!onHandleHarvestWithdraw) return
    setPendingTx(true)
    try {
      await onHandleHarvestWithdraw()
      toastSuccess(t('Success!'), t('Successfully harvest and stake.'))
      onDismiss()
    } catch (e) {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      console.error(e)
    } finally {
      setPendingTx(false)
    }
  }

  return (
    <Modal minWidth="300px" maxWidth="450px" width="100%" onDismiss={onDismiss}>
      <Container>
        <Text fontSize="24px">Claimed Rewards</Text>
        <ValueContainer>
          <Text color={isDark ? '#fff' : '#060514'} fontWeight={700} fontSize="17px" mr="24px">
            {insertThousandSeparator(claimedRewardsDisplay)}
          </Text>
          <Text color={isDark ? '#BFC8DA' : '#7A8596'} fontSize="13px" mr="24px">
            {`~ ${insertThousandSeparator(claimedRewardsBusd)} USD`}
          </Text>
        </ValueContainer>
        <Flex>
          <ActionButton variant="primaryGradient" disabled={pendingTx} onClick={handleHarvestStake}>
            Harvest & Stake
          </ActionButton>
          <ActionButton variant="primaryGradient" disabled={pendingTx} onClick={handleHarvestWithdraw}>
            Harvest & Withdraw
          </ActionButton>
        </Flex>
      </Container>
    </Modal>
  )
}

export default HarvestModal
