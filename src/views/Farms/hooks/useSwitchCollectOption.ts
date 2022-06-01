import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useMasterchef } from 'hooks/useContract'
import { switchCollectOption } from 'utils/calls'

const useSwitchCollectOption = (pid) => {
  const masterChefContract = useMasterchef()
  const { account } = useWeb3React()

  const handleSwitchCollectOption = useCallback(
    async (option) => {
      try {
        const txHash = await switchCollectOption(masterChefContract, pid, option)
        const receipt = await txHash.wait()
        return receipt.status
      } catch (err) {
        return false
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [masterChefContract, pid, account],
  )
  return { onSwitchCollectOption: handleSwitchCollectOption }
}

export default useSwitchCollectOption
