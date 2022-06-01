import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { farmsConfig, poolsConfig } from 'config/constants'
import useRefresh from 'hooks/useRefresh'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { usePriceCrssBusd } from 'state/farms/hooks'
import getBalance from '../utils/getBalance'
import getLpPriceInUsd from '../utils/getLpPriceInUsd'

const useAllStakings = () => {
  const [balances, setBalance] = useState([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const crssPriceBusd = usePriceCrssBusd()
  const allConfig = farmsConfig.concat(poolsConfig)
  useEffect(() => {
    const fetchAllBalances = async () => {
      const cells = await Promise.all(
        allConfig.map(async (farm) => {
          const req = {
            pid: farm.pid,
            address: account,
            param: 'rewardPayroll',
          }
          const rewardPayroll = await getBalance(req)
          if (farm.pid === 0) {
            const stakedCrssInBigNumber = new BigNumber(rewardPayroll._hex)
            return stakedCrssInBigNumber.div(DEFAULT_TOKEN_DECIMAL).multipliedBy(crssPriceBusd).toNumber()
          }
          const rewardPriceInUsd = await getLpPriceInUsd(rewardPayroll, farm, crssPriceBusd)
          return rewardPriceInUsd
        }),
      )
      setBalance(cells)
    }

    if (account) {
      fetchAllBalances()
    }
  }, [account, fastRefresh, crssPriceBusd, allConfig])
  return balances
}

export default useAllStakings
