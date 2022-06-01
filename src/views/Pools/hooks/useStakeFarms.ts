import { useCallback, useEffect } from 'react'
import { stakeFarm } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'
import { sendTransactionByBiconomy } from 'utils/useBiconomy'
import masterChef from 'config/abi/masterchef.json'
import { useWeb3React } from '@web3-react/core'
import { DEFAULT_REFERRER_ADDRESS, DEFAULT_TOKEN_DECIMAL } from 'config'
import BigNumber from 'bignumber.js'

const useStakeFarms = (pid: number) => {
  const masterChefContract = useMasterchef()
  const { account } = useWeb3React()

  const handleStake = useCallback(
    async (amount: string) => {
      try {
        // const txHash = await stakeFarm(masterChefContract, pid, amount)
        // const receipt = await txHash.wait()
        const tokenAmount = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
        const txHash = await sendTransactionByBiconomy(masterChefContract.address, masterChef, account, 'deposit', [
          pid,
          tokenAmount,
        ])
        return txHash
      } catch (e) {
        return false
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pid, masterChefContract, account],
  )

  return { onStake: handleStake }
}

export default useStakeFarms
