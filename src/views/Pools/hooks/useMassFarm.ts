import { useCallback } from 'react'
import { useMasterchef } from 'hooks/useContract'
import { massHarvestFarm, massStakeFarm } from 'utils/calls'

const useMassFarm = () => {
  const masterChefContract = useMasterchef()
  // const { account } = useWeb3React()

  const massHarvest = useCallback(
    async (library: any, pids: number[]) => {
      await massHarvestFarm(masterChefContract)
    },
    [masterChefContract],
  )

  const massStakeReward = useCallback(
    async (library: any, pids: number[]) => {
      await massStakeFarm(masterChefContract, pids)
    },
    [masterChefContract],
  )

  return { onMassHarvest: massHarvest, onMassStakeReward: massStakeReward }
}

export default useMassFarm
