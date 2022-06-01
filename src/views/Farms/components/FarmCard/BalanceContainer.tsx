// import React, { useCallback, useMemo } from 'react'
import React from 'react'
import BigNumber from 'bignumber.js'
import { Flex, useMatchBreakpoints } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
// import { getBalanceAmount, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
// import { usePriceCrssBusd, useLpTokenPrice } from 'state/farms/hooks'
import { usePriceCrssBusd } from 'state/farms/hooks'
import { useThemeManager } from 'state/user/hooks'
import Balance from 'components/Balance'
import {
  LabelNameText,
  BalanceItem,
  BalanceText,
  // VerticalDivider
} from './styled'
import { FarmWithStakedValue } from './CardActionsContainer'

interface BalanceContainerProps {
  farm: FarmWithStakedValue
  account?: string
}

const BalanceContainer: React.FC<BalanceContainerProps> = ({ farm, account }) => {
  const { t } = useTranslation()

  const [isDark] = useThemeManager()
  const { isXs, isSm } = useMatchBreakpoints()
  const {
    // stakedBalance: stakedBalanceAsString = 0,
    earnings: earningsAsString = 0,
  } = farm.userData || {}

  // const stakedBalance = useMemo(() => {
  //   return new BigNumber(stakedBalanceAsString)
  // }, [stakedBalanceAsString])
  const earnings = new BigNumber(earningsAsString)
  const crssPrice = usePriceCrssBusd()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.dividedBy(2).toFixed(3, BigNumber.ROUND_DOWN)
  const earningsBusd = rawEarningsBalance ? rawEarningsBalance.dividedBy(2).multipliedBy(crssPrice).toNumber() : 0

  // const lpPrice = useLpTokenPrice(farm.lpSymbol)
  const isMobile = isXs || isSm

  // const displayLpBalance = useCallback(() => {
  //   const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
  //   if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
  //     return stakedBalanceBigNumber.toFixed(10, BigNumber.ROUND_DOWN)
  //   }
  //   if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
  //     return getFullDisplayBalance(stakedBalance).toLocaleString()
  //   }
  //   return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  // }, [stakedBalance])

  // <VerticalDivider />
  //     <BalanceItem>
  //       <Flex>
  //         {/* <LabelNameText textTransform="uppercase" fontSize="16px" pr="4px">
  //           {farm.lpSymbol}
  //         </LabelNameText>
  //         <LabelNameText fontSize="16px">{t('Staked')}</LabelNameText> */}
  //         <LabelNameText
  //           textTransform="uppercase"
  //           // fontSize="16px"
  //           fontSize={isMobile ? '10px' : '12px'}
  //           pr="4px"
  //           color={isDark ? '#04F8AD' : '#7a8596'}
  //         >
  //           XCRSS
  //         </LabelNameText>
  //         <LabelNameText
  //           // fontSize="16px"
  //           fontSize={isMobile ? '10px' : '12px'}
  //           color={isDark ? '#04F8AD' : '#7a8596'}
  //         >
  //           {t('Earned')}
  //         </LabelNameText>
  //       </Flex>
  //       <Flex flexDirection="column" alignItems="center">
  //         <BalanceText
  //           isMobile={isMobile}
  //           // isZero={stakedBalance.eq(0)}
  //           // color={stakedBalance.eq(0) ? 'textSecondary' : ''}
  //         >
  //           {/* {displayLpBalance()} */}
  //           3,100
  //         </BalanceText>
  //         {/* {stakedBalance.gt(0) && lpPrice.gt(0) && ( */}
  //         <Balance
  //           fontSize={isMobile ? '10px' : '12px'}
  //           decimals={2}
  //           value={getBalanceNumber(lpPrice.times(stakedBalance))}
  //           unit=" USD"
  //           prefix="~"
  //         />
  //         {/* )} */}
  //       </Flex>
  //     </BalanceItem>

  return (
    <>
      <BalanceItem>
        <Flex>
          <LabelNameText
            textTransform="uppercase"
            // fontSize="16px"
            fontSize={isMobile ? '10px' : '12px'}
            pr="4px"
            color={isDark ? '#04F8AD' : '#7a8596'}
          >
            CRSS
          </LabelNameText>
          <LabelNameText
            // fontSize="16px"
            fontSize={isMobile ? '10px' : '12px'}
            color={isDark ? '#04F8AD' : '#7a8596'}
          >
            {t('Earned')}
          </LabelNameText>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <BalanceText
            isMobile={isMobile}
            // isZero={rawEarningsBalance.eq(0)}
            // color={rawEarningsBalance.eq(0) ? 'textSecondary' : 'transparent'}
          >
            {displayBalance}
          </BalanceText>
          <Balance fontSize={isMobile ? '' : '12px'} decimals={2} value={earningsBusd} unit=" USD" prefix="~" />
        </Flex>
      </BalanceItem>
    </>
  )
}

export default BalanceContainer
