import { BigNumber } from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { usePriceBnbBusd, usePriceCrssBusd } from 'state/farms/hooks'
import lpAprs from 'config/constants/lpAprs.json'
import { useSelector } from 'react-redux'
import { State } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { CAKE_PER_YEAR } from 'config'
import useRefresh from './useRefresh'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
function getAutoCompApy(
  poolWeight: BigNumber,
  crssPriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
  farmAddress: string,
): { rewardsApy: number; lpRewardsApy: number } {
  const yearlyCrssRewardAllocation = CAKE_PER_YEAR.times(poolWeight)
  const monthlyCrssRewardAllocation = yearlyCrssRewardAllocation.div(poolLiquidityUsd).div(12)
  let rewardsApy = monthlyCrssRewardAllocation.times(crssPriceUsd).div(poolLiquidityUsd)
  // for (let index = 0; index < 12; index++) {
  //   rewardsApy = rewardsApy.times(monthlyCrssRewardAllocation.times(crssPriceUsd)).div(poolLiquidityUsd)
  // }
  rewardsApy = rewardsApy.times(100)
  let rewardsApyAsNumber = null
  if (!rewardsApy.isNaN() && rewardsApy.isFinite()) {
    rewardsApyAsNumber = rewardsApy.toNumber()
  }
  const lpRewardsApy = lpAprs[farmAddress?.toLocaleLowerCase()] ?? 0
  return { rewardsApy: rewardsApyAsNumber, lpRewardsApy }
}

export default getAutoCompApy
