import { BigNumber } from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
// import { usePriceBnbBusd, usePriceCrssBusd } from 'state/farms/hooks'
// import { usePriceBnbBusd } from 'state/farms/hooks'
import { useSelector } from 'react-redux'
import { State } from 'state/types'
// import { getBalanceNumber } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import useRefresh from './useRefresh'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
function useUserPoolStaked() {
  const [balances, setBalance] = useState(0)
  const { fastRefresh } = useRefresh()
  const pools = useSelector((state: State) => state.pools.data)

  const calcTvl = useCallback(() => {
    let totalLiquidity = new BigNumber(0)

    pools.map((pool) => {
      const pendingCrss = pool?.userData?.pendingCrss ? new BigNumber(pool.userData.pendingCrss) : BIG_ZERO
      totalLiquidity = totalLiquidity.plus(pendingCrss)
      return true
    })

    setBalance(totalLiquidity.toNumber() / 1e18)
  }, [
    pools,
    // bnbPrice
  ])

  useEffect(() => {
    calcTvl()
  }, [fastRefresh, calcTvl])
  return balances
}

export default useUserPoolStaked
