import React, { useState, useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'

import { useTranslation } from 'contexts/Localization'
import { Text, Flex, useModal } from '@crosswise/uikit'
import { useAppDispatch } from 'state'
import { useThemeManager } from 'state/user/hooks'
import { usePriceCrssBusd } from 'state/farms/hooks'
import { fetchPoolUserDataAsync } from 'state/pools'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import useUnstakeFarms from 'views/Farms/hooks/useUnstakeFarms'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getBalanceAmount } from 'utils/formatBalance'

import { getAddress } from 'utils/addressHelpers'
import { getBscScanLink } from 'utils'
import { BIG_ZERO } from 'utils/bigNumber'

import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import { AprProps } from '../Apr'
import { MultiplierProps } from '../Multiplier'
import { LiquidityProps } from '../Liquidity'
import { FarmOptionProps } from '../FarmOption'
import { DepositFeeProps } from '../DepositFee'
import WithdrawModal from '../../WithdrawModal'
import {
  ActionPanelContainer as ActionContainer,
  ActionButtonsContainer,
  ColumnWrap,
  Container,
  StyledLinkExternal,
  StakeContainer,
  InfoContainer,
  EarnPanel,
  ActionButton,
} from './styled'

export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
  userDataReady: boolean
  expanded: boolean
  depositFee: DepositFeeProps
  farmOption: FarmOptionProps
  account: string
}

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  userDataReady,
  expanded,
  farmOption,
  account,
}) => {
  const farm = details
  const [autoVal, setAutoVal] = useState(false)
  const [vestVal, setVestVal] = useState(false)
  const [configFlag, setConfigFlag] = useState(false)

  const [isDark] = useThemeManager()

  useEffect(() => {
    if (!configFlag && userDataReady) {
      setConfigFlag(true)
      if (details.userData?.earnings === '0') {
        setVestVal(true)
      } else {
        setVestVal(farmOption.isVest)
      }
      setAutoVal(farmOption.isAuto)
    }
  }, [farmOption, userDataReady, details, configFlag])
  const { t } = useTranslation()

  const isActive = farm.multiplier !== '0X'
  const {
    quoteToken,
    token,
    pid,
    lpSymbol,
    userData: { earnings: earningsAsString = 0, stakedBalance: stakedBalanceAsString = 0 },
  } = farm

  const stakedBalance = useMemo(() => {
    return new BigNumber(stakedBalanceAsString)
  }, [stakedBalanceAsString])

  const { onUnstake } = useUnstakeFarms(pid)
  const dispatch = useAppDispatch()

  const lpLabel = lpSymbol && lpSymbol.toUpperCase().replace('PANCAKE', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const lpAddress = getAddress(farm.lpAddresses)
  const bsc = getBscScanLink(lpAddress, 'address')
  const info = `https://crosswise.info/pool/${lpAddress}`

  const earnings = new BigNumber(earningsAsString)
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.dividedBy(2).toFixed(3, BigNumber.ROUND_DOWN)
  const crssPrice = usePriceCrssBusd()
  const earningsBusd = rawEarningsBalance
    ? rawEarningsBalance.dividedBy(2).multipliedBy(crssPrice).toFixed(3, BigNumber.ROUND_DOWN)
    : 0

  const handleUnstake = async (amount: string) => {
    await onUnstake(amount)
    dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }))
  }

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={handleUnstake} tokenName={lpSymbol} />,
  )

  return (
    <ColumnWrap>
      <Container expanded={expanded}>
        <InfoContainer>
          {isActive && (
            <StakeContainer>
              <StyledLinkExternal href={`/liquidity/add/${liquidityUrlPathParts}`}>
                {t('Get %symbol%', { symbol: lpLabel })}
              </StyledLinkExternal>
            </StakeContainer>
          )}
          <StyledLinkExternal href={bsc}>Price Impact</StyledLinkExternal>
          <StyledLinkExternal href={info}>Liquidity Provider Fee</StyledLinkExternal>
        </InfoContainer>
        <EarnPanel>
          <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Text fontSize="13px" pr="8px" color="#04f8ad">
              $CRSS Earned
            </Text>
            <Text fontSize="17px" mr="24px" color={isDark ? '#fff' : '#060514'}>
              {displayBalance}
            </Text>
            <Text fontSize="13px" mr="24px" color={isDark ? '#bfc8da' : '#818ea3'}>
              {`~ ${earningsBusd} USD`}
            </Text>
          </Flex>
        </EarnPanel>

        <ActionContainer>
          {account ? (
            <StakedAction {...farm} userDataReady={userDataReady} isVest={vestVal} isAuto={autoVal} />
          ) : (
            <ConnectWalletButton scale="sm" variant="primaryGradient" />
          )}
          <ActionButtonsContainer>
            <ActionButton
              onClick={(e) => {
                e.stopPropagation()
                onPresentWithdraw()
              }}
              width="150px"
              disabled={!account || earnings.eq(0)}
              variant="primaryGradient"
            >
              Withdraw
            </ActionButton>
            <HarvestAction
              {...farm}
              account={account}
              userDataReady={userDataReady}
              isVest={vestVal}
              isAuto={autoVal}
            />
          </ActionButtonsContainer>
        </ActionContainer>
      </Container>
    </ColumnWrap>
  )
}

export default ActionPanel
