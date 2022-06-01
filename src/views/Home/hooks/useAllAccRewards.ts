import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { farmsConfig, poolsConfig } from 'config/constants'
import useRefresh from 'hooks/useRefresh'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { usePriceCrssBusd } from 'state/farms/hooks'
import getBalance from '../utils/getBalance'

const useAllAccRewards = () => {
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
            param: 'accRewards',
          }
          const result = await getBalance(req)
          const resultInBigNumber = new BigNumber(result._hex)
          return resultInBigNumber.div(DEFAULT_TOKEN_DECIMAL).multipliedBy(crssPriceBusd).toNumber()
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

export default useAllAccRewards
