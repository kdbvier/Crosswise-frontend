import { BigNumber } from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { usePriceBnbBusd, usePriceCrssBusd } from 'state/farms/hooks'
import { useSelector } from 'react-redux'
import { State } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import useRefresh from './useRefresh'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
function useFarmTvl() {
  const [balances, setBalance] = useState(0)
  const { fastRefresh } = useRefresh()
  const bnbPrice = usePriceBnbBusd()
  const farms = useSelector((state: State) => state.farms.data)

  const calcTvl = useCallback(() => {
    let totalLiquidity = new BigNumber(0)

    farms.map((farm) => {
      if (farm.lpTotalInQuoteToken && farm.lpTotalInQuoteToken.toString() !== 'NaN') {
        let quoteTokenPriceUsd = new BigNumber(1)
        if (farm.quoteToken.symbol === 'wBNB') {
          quoteTokenPriceUsd = quoteTokenPriceUsd.times(bnbPrice)
        } else if (farm.quoteToken.symbol === 'BUSD') {
          quoteTokenPriceUsd = quoteTokenPriceUsd.times(1)
        }
        totalLiquidity = totalLiquidity.plus(new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd))
      }
      return true
    })

    setBalance(totalLiquidity.toNumber())
  }, [farms, bnbPrice])

  useEffect(() => {
    calcTvl()
  }, [fastRefresh, calcTvl])

  return balances
}

export default useFarmTvl
