import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import useRefresh from 'hooks/useRefresh'
import { fetchPoolsPublicDataAsync, fetchPoolUserDataAsync } from '.'
import { State, Pool, PoolsState } from '../types'
import { useFarmFromPid } from '../farms/hooks'

export const usePollPoolsData = (includeArchive = false) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  useEffect(() => {
    const pids = [0]

    dispatch(fetchPoolsPublicDataAsync(pids))

    if (account) {
      dispatch(fetchPoolUserDataAsync({ account, pids }))
    }
  }, [includeArchive, dispatch, slowRefresh, account])
}

/**
 * Fetches the "core" pool data used globally
 * 0 = CRSS LP
 */
export const usePollCorePoolData = () => {
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    dispatch(fetchPoolsPublicDataAsync([0]))
  }, [dispatch, fastRefresh])
}

export const usePools = (): PoolsState => {
  const pools = useSelector((state: State) => state.pools)
  return pools
}

export const usePoolFromPid = (pid): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((f) => f.pid === pid))
  return pool
}

export const usePoolFromLpSymbol = (lpSymbol: string): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((f) => f.lpSymbol === lpSymbol))
  return pool
}

export const usePoolUser = (pid) => {
  const pool = usePoolFromPid(pid)

  return {
    allowance: pool.userData ? new BigNumber(pool.userData.allowance) : BIG_ZERO,
    tokenBalance: pool.userData ? new BigNumber(pool.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: pool.userData ? new BigNumber(pool.userData.stakedBalance) : BIG_ZERO,
    earnings: pool.userData ? new BigNumber(pool.userData.earnings) : BIG_ZERO,
    accumulatedRewards: pool.userData ? new BigNumber(pool.userData.accumulatedRewards) : BIG_ZERO,
    pendingCrss: pool.userData ? new BigNumber(pool.userData.pendingCrss) : BIG_ZERO,
    vestingRewards: pool.userData ? new BigNumber(pool.userData.vestingRewards) : BIG_ZERO,
    vestingList: pool.userData?.vestingList || [],
    isVest: pool.userData ? pool.userData.isVest : false,
    isAuto: pool.userData ? pool.userData.isAuto : false,
  }
}

// Return the base token price for a pool, from a given pid
export const useBusdPriceFromPid = (pid: number): BigNumber => {
  const pool = usePoolFromPid(pid)
  return pool && new BigNumber(pool.token.busdPrice)
}

export const useLpTokenPrice = (symbol: string) => {
  const pool = usePoolFromLpSymbol(symbol)
  const poolTokenPriceInUsd = useBusdPriceFromPid(pool.pid)
  let lpTokenPrice = BIG_ZERO

  if (pool.lpTotalSupply && pool.lpTotalInQuoteToken) {
    // Total value of base token in LP
    const valueOfBaseTokenInPool = poolTokenPriceInUsd.times(pool.tokenAmountTotal)
    // Double it to get overall value in LP
    const overallValueOfAllTokensInPool = valueOfBaseTokenInPool.times(2)
    // Divide total value of all tokens, by the number of LP tokens
    const totalLpTokens = getBalanceAmount(new BigNumber(pool.lpTotalSupply))
    lpTokenPrice = overallValueOfAllTokensInPool.div(totalLpTokens)
  }

  return lpTokenPrice
}

// /!\ Deprecated , use the BUSD hook in /hooks

export const usePriceBnbBusd = (): BigNumber => {
  // const bnbBusdPool = usePoolFromPid(3)
  // return new BigNumber(bnbBusdPool.quoteToken.busdPrice)
  return new BigNumber(400)
}

export const usePriceCrssBusd = (): BigNumber => {
  const crssBnbPool = useFarmFromPid(2)
  const crssPriceBusdAsString = crssBnbPool.token.busdPrice
  const crssPriceBusd = useMemo(() => {
    return new BigNumber(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crssPriceBusdAsString])

  return crssPriceBusd
  // return new BigNumber(1)
}
