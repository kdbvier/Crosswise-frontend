import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Flex } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { useAppDispatch } from 'state'
import { fetchPoolUserDataAsync } from 'state/pools'
import useToast from 'hooks/useToast'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { useWeb3React } from '@web3-react/core'
// import { usePriceCrssBusd } from 'state/farms/hooks'
// import Balance from 'components/Balance'
import useHarvestFarm from '../../hooks/useHarvestFarm'
import { StyledActionButton } from './styled'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
  isAuto?: boolean
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid, isAuto }) => {
  // const { account, library } = useWeb3React()
  const { account } = useWeb3React()
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestFarm(pid)
  // const crssPrice = usePriceCrssBusd()
  const dispatch = useAppDispatch()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  // const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)
  // const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(crssPrice).toNumber() : 0

  return (
    <Flex justifyContent="space-between" alignItems="center" width="40%">
      <StyledActionButton
        disabled={rawEarningsBalance.eq(0) || pendingTx || isAuto}
        variant="primaryGradient"
        onClick={async () => {
          setPendingTx(true)
          try {
            // await onReward(library)
            await onReward()
            toastSuccess(
              `${t('Harvested')}!`,
              t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'CRSS' }),
            )
          } catch (e) {
            toastError(
              t('Error'),
              t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
            )
            console.error(e)
          } finally {
            setPendingTx(false)
          }
          dispatch(fetchPoolUserDataAsync({ account, pids: [pid] }))
        }}
        width="100%"
      >
        {t('Harvest')}
      </StyledActionButton>
    </Flex>
  )
}

export default HarvestAction
