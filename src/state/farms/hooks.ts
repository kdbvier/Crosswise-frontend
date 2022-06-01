import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
// import { farmsConfig } from 'config/constants'
import useRefresh from 'hooks/useRefresh'
// import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync, nonArchivedFarms } from '.'
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync } from '.'
import { State, Farm, FarmsState } from '../types'

export const usePollFarmsData = (includeArchive = false) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  useEffect(() => {
    // const farmsToFetch = includeArchive ? farmsConfig : nonArchivedFarms
    // const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid)
    const pids = [1, 2, 3]

    dispatch(fetchFarmsPublicDataAsync(pids))

    if (account) {
      dispatch(fetchFarmUserDataAsync({ account, pids }))
    }
  }, [includeArchive, dispatch, slowRefresh, account])
}

/**
 * Fetches the "core" farm data used globally
 * 0 = CRSS LP
 * 1 = CRSS-BNB LP
 * 2 = CRSS-BUSD LP
 * 3 = BNB-BUSD LP
 */
export const usePollCoreFarmData = () => {
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    // dispatch(fetchFarmsPublicDataAsync([0, 1, 2, 3]))
    dispatch(fetchFarmsPublicDataAsync([1, 2, 3]))
  }, [dispatch, fastRefresh])
}

export const useFarms = (): FarmsState => {
  const farms = useSelector((state: State) => state.farms)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromLpSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
    accumulatedRewards: farm.userData ? new BigNumber(farm.userData.accumulatedRewards) : BIG_ZERO,
    pendingCrss: farm.userData ? new BigNumber(farm.userData.pendingCrss) : BIG_ZERO,
    vestingRewards: farm.userData ? new BigNumber(farm.userData.vestingRewards) : BIG_ZERO,
    vestingList: farm.userData?.vestingList || [],
    isVest: farm.userData ? farm.userData.isVest : false,
    isAuto: farm.userData ? farm.userData.isAuto : false,
  }
}

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPid = (pid: number): BigNumber => {
  const farm = useFarmFromPid(pid)
  return farm && new BigNumber(farm.token.busdPrice)
}

export const useLpTokenPrice = (symbol: string) => {
  const farm = useFarmFromLpSymbol(symbol)
  const farmTokenPriceInUsd = useBusdPriceFromPid(farm.pid)
  let lpTokenPrice = BIG_ZERO

  if (farm.lpTotalSupply && farm.lpTotalInQuoteToken) {
    // Total value of base token in LP
    const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(farm.tokenAmountTotal)
    // Double it to get overall value in LP
    const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2)
    // Divide total value of all tokens, by the number of LP tokens
    const totalLpTokens = getBalanceAmount(new BigNumber(farm.lpTotalSupply))
    lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens)
  }

  return lpTokenPrice
}

// /!\ Deprecated , use the BUSD hook in /hooks

export const usePriceBnbBusd = (): BigNumber => {
  // const bnbBusdFarm = useFarmFromPid(3)
  // return new BigNumber(bnbBusdFarm.quoteToken.busdPrice)
  return new BigNumber(400)
}

export const usePriceCrssBusd = () => {
  const crssBnbFarm = useFarmFromPid(2)
  const crssPriceBusdAsString = crssBnbFarm.token.busdPrice

  const crssPriceBusd = useMemo(() => {
    return new BigNumber(crssPriceBusdAsString)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crssPriceBusdAsString])
  return crssPriceBusd
}
