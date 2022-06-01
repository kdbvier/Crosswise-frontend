import { BigNumber } from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { farmsConfig, poolsConfig } from 'config/constants'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { usePriceCrssBusd } from 'state/farms/hooks'
import { getBnbPrice } from 'utils/priceProvider'
import { getCrssContract } from 'utils/contractHelpers'
import getReservesPriceInUsd from './getReservesPriceInUsd'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
const useTVL = () => {
  const [balances, setBalance] = useState(0)
  const crssContract = getCrssContract()
  const crssPriceBusd = usePriceCrssBusd()
  // const masterChefAddress = getMasterChefAddress()
  useEffect(() => {
    const fetchBalances = async () => {
      let totalLiquidity = 0
      const bnbPrice = await getBnbPrice()
      console.log('bnbPrice: ', bnbPrice)
      const farmCells = await Promise.all(
        farmsConfig.map(async (farm, index) => {
          const lpPriceInUsd = await getReservesPriceInUsd(farm, crssPriceBusd)
          totalLiquidity += lpPriceInUsd
          return true
        }),
      )
      const poolCells = await Promise.all(
        poolsConfig.map(async (pool, index) => {
          const depositedCrss = await crssContract.balanceOf('0x96C16fF6eB7Ee19CDa8F4d452af9C55b936d62e5')
          const depositedCrssInBigNumber = new BigNumber(depositedCrss._hex)
          totalLiquidity += depositedCrssInBigNumber.div(DEFAULT_TOKEN_DECIMAL).multipliedBy(crssPriceBusd).toNumber()
          return true
        }),
      )
      setBalance(totalLiquidity)
    }
    fetchBalances()
  }, [crssPriceBusd, crssContract])
  return balances.toFixed(2)
}

export default useTVL
