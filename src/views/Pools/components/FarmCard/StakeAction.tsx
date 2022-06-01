import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, AddIcon, MinusIcon, useModal } from '@crosswise/uikit'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { fetchPoolUserDataAsync } from 'state/pools'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'
import useUnstakeFarms from '../../hooks/useUnstakeFarms'
import useStakeFarms from '../../hooks/useStakeFarms'

import { StakeActionWrapper, StyledActionButton } from './styled'

interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  addLiquidityUrl?: string
  isVest: boolean
  isAuto: boolean
}

const IconButtonWrapper = styled.div`
  display: flex;
  width: 50%;
  svg {
    width: 20px;
  }
`

const StakeAction: React.FC<FarmCardActionsProps> = ({
  stakedBalance,
  tokenBalance,
  tokenName,
  pid,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()
  const { onStake } = useStakeFarms(pid)
  const { onUnstake } = useUnstakeFarms(pid)
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  // const lpPrice = useLpTokenPrice(tokenName)

  const handleStake = async (amount: string) => {
    // Deposit with referrer link
    await onStake(amount)
    dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }))
  }

  const handleUnstake = async (amount: string) => {
    // await onUnstake(amount, library)
    await onUnstake(amount)
    dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }))
  }

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={handleStake} tokenName={tokenName} addLiquidityUrl={addLiquidityUrl} />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={handleUnstake} tokenName={tokenName} />,
  )

  const renderStakingButtons = () => {
    return stakedBalance.eq(0) ? (
      <StyledActionButton
        width="100%"
        onClick={onPresentDeposit}
        variant="primaryGradient"
        disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
      >
        {t('Stake LP')}
      </StyledActionButton>
    ) : (
      <IconButtonWrapper>
        <Button variant="secondaryGradient" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="text" width="14px" />
        </Button>
        <Button
          variant="primaryGradient"
          onClick={onPresentDeposit}
          disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
        >
          <AddIcon color="text" width="14px" />
        </Button>
      </IconButtonWrapper>
    )
  }

  return (
    <StakeActionWrapper justifyContent="space-between" alignItems="center">
      {renderStakingButtons()}
    </StakeActionWrapper>
  )
}

export default StakeAction
