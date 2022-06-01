import { useCallback } from 'react'
import { harvestFarm, harvestStakeFarm, harvestWithdrawFarm, vestWithdrawFarm } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'
// import { sendTransactionByBiconomy } from 'utils/useBiconomy'
// import masterChef from 'config/abi/masterchef.json'
// import { useWeb3React } from '@web3-react/core'
// import BigNumber from 'bignumber.js'
// import { DEFAULT_REFERRER_ADDRESS, DEFAULT_TOKEN_DECIMAL } from 'config'

const useHarvestFarm = (farmPid: number) => {
  const masterChefContract = useMasterchef()
  // const { account } = useWeb3React()

  const handleHarvestStake = useCallback(async () => {
    try {
      const txHash = await harvestStakeFarm(masterChefContract, farmPid)
      const receipt = await txHash.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [farmPid, masterChefContract])

  const handleHarvestWithdraw = useCallback(async () => {
    try {
      const txHash = await harvestWithdrawFarm(masterChefContract, farmPid)
      const receipt = await txHash.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [farmPid, masterChefContract])

  const handleVestWithdraw = useCallback(
    async (amount) => {
      try {
        const txHash = await vestWithdrawFarm(masterChefContract, farmPid, amount)
        const receipt = await txHash.wait()
        return receipt.status
      } catch (e) {
        return false
      }
    },
    [farmPid, masterChefContract],
  )

  const handleHarvest = useCallback(async () => {
    try {
      const txHash = await harvestFarm(masterChefContract, farmPid)
      const receipt = await txHash.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [farmPid, masterChefContract])

  // const handleHarvest = useCallback(
  //   async (library: any, referrer?: string) => {
  //     let referrerAddress = referrer
  //     const tokenAmount = new BigNumber('0').times(DEFAULT_TOKEN_DECIMAL).toString()
  //     if (!referrer) referrerAddress = DEFAULT_REFERRER_ADDRESS

  //     const txHash = await sendTransactionByBiconomy(
  //       library,
  //       masterChefContract.address,
  //       masterChef,
  //       account,
  //       'withdraw',
  //       [farmPid, tokenAmount],
  //     )
  //   },
  //   [farmPid, masterChefContract, account],
  // )

  return {
    onReward: handleHarvest,
    onHarvestStake: handleHarvestStake,
    onHarvestWithdraw: handleHarvestWithdraw,
    onVestWithdraw: handleVestWithdraw,
  }
}

export default useHarvestFarm
