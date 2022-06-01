import { BigNumber } from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { usePriceBnbBusd, usePriceCrssBusd } from 'state/farms/hooks'
import { useSelector } from 'react-redux'
import { State } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import useRefresh from './useRefresh'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
function useStaked() {
  const [balances, setBalance] = useState(0)
  const { fastRefresh } = useRefresh()
  const bnbPrice = usePriceBnbBusd()
  const farms = useSelector((state: State) => state.farms.data)
  const pools = useSelector((state: State) => state.pools.data)

  const calcTvl = useCallback(() => {
    let stakedBalance = new BigNumber(0)

    farms.map((farm) => {
      if (farm.userData && farm.userData.stakedBalance && farm.userData.stakedBalance.toString() !== 'NaN') {
        let quoteTokenPriceUsd = new BigNumber(1)
        if (farm.quoteToken.symbol === 'WBNB') {
          quoteTokenPriceUsd = quoteTokenPriceUsd.times(bnbPrice)
        } else if (farm.quoteToken.symbol === 'BUSD') {
          quoteTokenPriceUsd = quoteTokenPriceUsd.times(1)
        }
        stakedBalance = stakedBalance.plus(
          getBalanceNumber(
            new BigNumber(farm.userData.stakedBalance).times(quoteTokenPriceUsd),
            farm.quoteToken.decimals,
          ),
        )
        // stakedBalance = stakedBalance.plus(new BigNumber(farm.userData.stakedBalance).times(quoteTokenPriceUsd))
      }
      return true
    })

    setBalance(stakedBalance.toNumber())
  }, [farms, bnbPrice])

  useEffect(() => {
    calcTvl()
  }, [fastRefresh, calcTvl])

  return balances
}

export default useStaked
