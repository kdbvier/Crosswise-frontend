import React from 'react'
import { Text, Skeleton, useTooltip } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { useThemeManager } from 'state/user/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { LiquidityWrapper, Container } from './styled'

export interface StakedProps {
  staked: BigNumber
  userDataReady: boolean
}

const Staked: React.FunctionComponent<StakedProps> = ({ staked, userDataReady }) => {
  // const displayLiquidity =
  //   liquidity && liquidity.gt(0) ? (
  //     `$${Number(liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  //   ) : (
  //     <Skeleton width={60} />
  //   )

  const displayLiquidity = staked && staked.gt(0) ? getBalanceNumber(staked) : 0
  const { t } = useTranslation()

  const [isDark] = useThemeManager()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Total value of the funds in this farm’s liquidity pool'),
    { placement: 'top-end', tooltipOffset: [20, 10] },
  )

  return (
    <Container ref={targetRef}>
      <LiquidityWrapper>
        {/* <Text fontSize="16px">{displayLiquidity}</Text>
        <Text fontSize="12px">~ 0 USD</Text> */}
        <Text fontSize="16px" color={isDark ? '#fff' : '#060514'}>
          {/* 10000000 CRSS */}
          {userDataReady ? displayLiquidity : <Skeleton width={60} />}
        </Text>
        <Text fontSize="13px" mt="5px" color={isDark ? '#bfc8da' : '#818ea3'}>
          {userDataReady ? `~ ${displayLiquidity} USD` : <Skeleton width={60} />}
        </Text>
      </LiquidityWrapper>
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default Staked
