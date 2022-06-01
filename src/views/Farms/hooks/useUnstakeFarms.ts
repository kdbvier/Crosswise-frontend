import { useCallback } from 'react'
import { unstakeFarm } from 'utils/calls'
import { useMasterchef } from 'hooks/useContract'
import { sendTransactionByBiconomy } from 'utils/useBiconomy'
import masterChef from 'config/abi/masterchef.json'
import { useWeb3React } from '@web3-react/core'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import BigNumber from 'bignumber.js'

const useUnstakeFarms = (pid: number) => {
  const masterChefContract = useMasterchef()
  const { account } = useWeb3React()
  const handleUnstake = useCallback(
    async (amount: string) => {
      const tokenAmount = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
      const txHash = await sendTransactionByBiconomy(masterChefContract.address, masterChef, account, 'withdraw', [
        pid,
        tokenAmount,
      ])
      console.log('txHashStatus: ', txHash)
    },
    [pid, masterChefContract, account],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeFarms
