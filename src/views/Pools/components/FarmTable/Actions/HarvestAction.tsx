// import React, { useState } from 'react'
import React from 'react'
// import { Button, Skeleton, Text } from '@crosswise/uikit'
// import { Skeleton } from '@crosswise/uikit'
import BigNumber from 'bignumber.js'
// import { useWeb3React } from '@web3-react/core'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { useTranslation } from 'contexts/Localization'
// import useHarvestFarm from '../../../hooks/useHarvestFarm'

import {
  ActionContainer,
  // ActionTitles,
  ActionContent,
  // ActionTitlesContainer,
  // ActionTitleContent,
  ActionButton,
} from './styled'

interface HarvestActionProps extends FarmWithStakedValue {
  account: string
  userDataReady: boolean
  isAuto?: boolean
  isVest?: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({
  // pid,
  userData,
  // userDataReady,
  isVest,
  // isAuto,
  account,
}) => {
  // const { toastSuccess, toastError } = useToast()
  const temp = new BigNumber(userData.earnings)
  const earningsBigNumber = temp.dividedBy(2)
  // const crssPrice = usePriceCrssBusd()
  // let earnings = BIG_ZERO
  // let earningsBusd = 0
  // let xCrssEarnings = BIG_ZERO
  // let xCrssBusd = 0
  // let displayBalance = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />
  // let displayXcrss = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    // earnings = getBalanceAmount(earningsBigNumber)
    // earningsBusd = earnings.multipliedBy(crssPrice).toNumber()
    // displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)

    if (!isVest) {
      // xCrssEarnings = earnings.dividedBy(2)
      // xCrssBusd = xCrssEarnings.multipliedBy(crssPrice).toNumber()
      // displayXcrss = xCrssEarnings.toFixed(3, BigNumber.ROUND_DOWN)
    } else {
      // xCrssEarnings = earnings
      // xCrssBusd = earningsBusd
      // displayXcrss = xCrssEarnings.toFixed(3, BigNumber.ROUND_DOWN)
    }
  }

  // const [pendingTx, setPendingTx] = useState(false)
  // const { onReward } = useHarvestFarm(pid)
  const { t } = useTranslation()
  // const dispatch = useAppDispatch()
  // const { account, library } = useWeb3React()
  // const { account } = useWeb3React()

  // const clickActionButton = async () => {
  //   setPendingTx(true)
  //   try {
  //     // await onReward(library)
  //     await onReward()
  //     toastSuccess(`${t('Harvested')}!`, t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'CRSS' }))
  //   } catch (e) {
  //     toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
  //     console.error(e)
  //   } finally {
  //     setPendingTx(false)
  //   }
  //   dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))
  // }

  return (
    <ActionContainer>
      {/* <ActionTitlesContainer>
        <ActionTitleContent>
          <ActionTitles>
            <Text bold textTransform="uppercase" fontSize="14px" pr="4px">
              CRSS
            </Text>
            <Text bold fontSize="14px">
              {t('Earned')}
            </Text>
          </ActionTitles>
          <ActionContent>
            <div>
              <Text color={Number(displayBalance) ? 'text' : 'textDisabled'} fontSize="14px">
                {displayBalance}
              </Text>
              {earningsBusd > 0 && <Balance fontSize="12px" decimals={2} value={earningsBusd} unit=" USD" prefix="~" />}
            </div>
          </ActionContent>
        </ActionTitleContent>
        <ActionTitleContent>
          <ActionTitles>
            <Text bold textTransform="uppercase" fontSize="14px" pr="4px">
              XCRSS
            </Text>
            <Text bold fontSize="14px">
              {t('Earned')}
            </Text>
          </ActionTitles>
          <ActionContent>
            <div>
              <Text color={Number(displayXcrss) ? 'text' : 'textDisabled'} fontSize="14px">
                {displayXcrss}
              </Text>
              {xCrssBusd > 0 && <Balance fontSize="12px" decimals={2} value={xCrssBusd} unit=" USD" prefix="~" />}
            </div>
          </ActionContent>
        </ActionTitleContent>
      </ActionTitlesContainer> */}
      <ActionContent>
        <ActionButton
          disabled={!account}
          // disabled={earnings.eq(0) || pendingTx || !userDataReady || isAuto}
          // onClick={clickActionButton}
          variant="primaryGradient"
          width="150px"
          // variant="primaryGradient"
          ml="4px"
        >
          {t('Harvest')}
        </ActionButton>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
