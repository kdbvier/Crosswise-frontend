import React from 'react'
import BigNumber from 'bignumber.js'
import { Flex, useMatchBreakpoints } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { usePriceCrssBusd } from 'state/farms/hooks'
import { useThemeManager } from 'state/user/hooks'
import Balance from 'components/Balance'
import { LabelNameText, BalanceItem, BalanceText } from './styled'
import { FarmWithStakedValue } from './CardActionsContainer'

interface BalanceContainerProps {
  farm: FarmWithStakedValue
  account?: string
}

const BalanceContainer: React.FC<BalanceContainerProps> = ({ farm, account }) => {
  const { t } = useTranslation()

  const [isDark] = useThemeManager()
  const { isXs, isSm } = useMatchBreakpoints()
  const { earnings: earningsAsString = 0 } = farm.userData || {}

  const earnings = new BigNumber(earningsAsString)
  const crssPrice = usePriceCrssBusd()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.dividedBy(2).toFixed(3, BigNumber.ROUND_DOWN)
  const earningsBusd = rawEarningsBalance ? rawEarningsBalance.dividedBy(2).multipliedBy(crssPrice).toNumber() : 0

  const isMobile = isXs || isSm

  return (
    <>
      <BalanceItem>
        <Flex>
          <LabelNameText
            textTransform="uppercase"
            fontSize={isMobile ? '10px' : '12px'}
            pr="4px"
            color={isDark ? '#04F8AD' : '#7a8596'}
          >
            CRSS
          </LabelNameText>
          <LabelNameText fontSize={isMobile ? '10px' : '12px'} color={isDark ? '#04F8AD' : '#7a8596'}>
            {t('Earned')}
          </LabelNameText>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <BalanceText isMobile={isMobile}>{displayBalance}</BalanceText>
          <Balance fontSize={isMobile ? '' : '12px'} decimals={2} value={earningsBusd} unit=" USD" prefix="~" />
        </Flex>
      </BalanceItem>
    </>
  )
}

export default BalanceContainer
