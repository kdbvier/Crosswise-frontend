import React, { useState, useCallback } from 'react'
// import { useModal, IconButton, AddIcon, MinusIcon, Skeleton, Text, Heading } from '@crosswise/uikit'
import { useModal } from '@crosswise/uikit'
import { useLocation } from 'react-router-dom'
// import { BigNumber } from 'bignumber.js'
// import ConnectWalletButton from 'components/ConnectWalletButton'
// import Balance from 'components/Balance'
import { useWeb3React } from '@web3-react/core'
// import { usePoolUser, useLpTokenPrice, useFarmFromPid } from 'state/farms/hooks'
import { usePoolUser } from 'state/pools/hooks'
import { fetchPoolUserDataAsync } from 'state/pools'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { useAppDispatch } from 'state'
import { getAddress } from 'utils/addressHelpers'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
// import { getBalanceAmount, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
// import useUnstakeFarms from '../../../hooks/useUnstakeFarms'
import DepositModal from '../../DepositModal'
// import WithdrawModal from '../../WithdrawModal'
import useStakeFarms from '../../../hooks/useStakeFarms'
import useApproveFarm from '../../../hooks/useApproveFarm'
import {
  ActionContainer,
  // ActionTitles,
  ActionContent,
  // ActionTitlesContainer,
  // IconButtonWrapper,
  ActionButton,
  // StyledConnectWalletButton,
  // StyledSkeleton,
} from './styled'

interface StackedActionProps extends FarmWithStakedValue {
  userDataReady: boolean
  isVest: boolean
  isAuto: boolean
}

const Staked: React.FunctionComponent<StackedActionProps> = ({
  pid,
  lpSymbol,
  lpAddresses,
  quoteToken,
  token,
  // userDataReady,
  apr,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [requestedApproval, setRequestedApproval] = useState(false)
  // const { allowance, tokenBalance, stakedBalance } = usePoolUser(pid)
  const { allowance, tokenBalance } = usePoolUser(pid)
  const { onStake } = useStakeFarms(pid)
  // const { onUnstake } = useUnstakeFarms(pid)
  const location = useLocation()
  // const lpPrice = useLpTokenPrice(lpSymbol)

  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const lpAddress = getAddress(lpAddresses)
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const handleStake = async (amount: string) => {
    // Deposit with referrer link
    await onStake(amount)
    dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }))
  }

  // const handleUnstake = async (amount: string) => {
  //   await onUnstake(amount, library)
  //   dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }))
  // }

  // const displayBalance = useCallback(() => {
  //   const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
  //   if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
  //     return stakedBalanceBigNumber.toFixed(10, BigNumber.ROUND_DOWN)
  //   }
  //   if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
  //     return getFullDisplayBalance(stakedBalance).toLocaleString()
  //   }
  //   return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  // }, [stakedBalance])

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      apr={apr}
      onConfirm={handleStake}
      tokenName={lpSymbol}
      addLiquidityUrl={addLiquidityUrl}
    />,
  )

  // const [onPresentWithdraw] = useModal(
  //   <WithdrawModal max={stakedBalance} onConfirm={handleUnstake} tokenName={lpSymbol} />,
  // )
  const lpContract = useERC20(lpAddress)
  const dispatch = useAppDispatch()
  const { onApprove } = useApproveFarm(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }))

      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, dispatch, account, pid])

  // if (!account) {
  //   return (
  //     <ActionContainer>
  //       {/* <ActionTitles>
  //         <Text bold textTransform="uppercase" fontSize="12px">
  //           {t('Start Farming')}
  //         </Text>
  //       </ActionTitles> */}
  //       <ActionContent>
  //         <StyledConnectWalletButton width="100%" variant="primaryGradient" />
  //       </ActionContent>
  //     </ActionContainer>
  //   )
  // }

  if (isApproved) {
    // if (stakedBalance.gt(0)) {
    //   return (
    //     <ActionContainer>
    //       <ActionTitlesContainer style={{ display: 'block', width: '150px' }}>
    //         <ActionTitles>
    //           <Text bold fontSize="12px" pr="4px">
    //             {lpSymbol}
    //           </Text>
    //           <Text bold fontSize="12px">
    //             {t('Staked')}
    //           </Text>
    //         </ActionTitles>
    //         <div>
    //           <Text fontSize="14px">{displayBalance()}</Text>
    //           {stakedBalance.gt(0) && lpPrice.gt(0) && (
    //             <Balance
    //               fontSize="12px"
    //               decimals={2}
    //               value={getBalanceNumber(lpPrice.times(stakedBalance))}
    //               unit=" USD"
    //               prefix="~"
    //             />
    //           )}
    //         </div>
    //       </ActionTitlesContainer>
    //       <ActionContent>
    //         {/* <Button onClick={() => handleStake('10000000000000')}>test</Button> */}
    //         <IconButtonWrapper>
    //           <IconButton variant="secondaryGradient" onClick={onPresentWithdraw} mr="6px">
    //             <MinusIcon color="text" width="14px" />
    //           </IconButton>
    //           <IconButton
    //             variant="secondaryGradient"
    //             onClick={onPresentDeposit}
    //             disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
    //           >
    //             <AddIcon color="text" width="14px" />
    //           </IconButton>
    //         </IconButtonWrapper>
    //       </ActionContent>
    //     </ActionContainer>
    //   )
    // }

    return (
      <ActionContainer>
        {/* <ActionTitles>
          <div style={{ margin: 'auto' }}>
            <Text bold fontSize="14px" pr="4px">
              {t('Stake').toUpperCase()}
            </Text>
            <Text bold fontSize="14px">
              {lpSymbol}
            </Text>
          </div>
        </ActionTitles> */}
        <ActionContent>
          {/* <Button onClick={() => handleStake('10000000000000')}>test</Button> */}
          <ActionButton
            width="314px"
            onClick={(e) => {
              e.stopPropagation()
              onPresentDeposit()
            }}
            variant="primaryGradient"
            disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
          >
            {t('Deposit')}
          </ActionButton>
        </ActionContent>
      </ActionContainer>
    )
  }

  // if (!userDataReady) {
  //   return (
  //     <ActionContainer>
  //       {/* <ActionTitles>
  //         <Text bold textTransform="uppercase" fontSize="12px">
  //           {t('Start Farming')}
  //         </Text>
  //       </ActionTitles> */}
  //       <ActionContent>
  //         <StyledSkeleton />
  //       </ActionContent>
  //     </ActionContainer>
  //   )
  // }

  return (
    <ActionContainer>
      {/* <ActionTitles style={{ alignItems: 'center' }}>
        <Text bold fontSize="14px">
          {t('Enable Farm')}
        </Text>
      </ActionTitles> */}
      <ActionContent>
        <ActionButton
          width="314px"
          disabled={requestedApproval}
          onClick={(e) => {
            e.stopPropagation()
            handleApprove()
          }}
          variant="primaryGradient"
        >
          {t('Enable')}
        </ActionButton>
      </ActionContent>
    </ActionContainer>
  )
}

export default Staked
