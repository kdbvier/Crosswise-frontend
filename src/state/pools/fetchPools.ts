import { PoolConfig } from 'config/constants/types'
import fetchPool from './fetchPool'

const fetchPools = async (poolsToFetch: PoolConfig[]) => {
  const data = await Promise.all(
    poolsToFetch.map(async (poolConfig, index) => {
      const farm = await fetchPool(poolConfig)
      return farm
    }),
  )
  return data
}

export default fetchPools
