import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useMasterchef } from 'hooks/useContract'
import { claimFarm } from 'utils/calls'

const useClaimFarm = (pid) => {
  const masterChefContract = useMasterchef()
  const { account } = useWeb3React()

  const handleClaimFarm = useCallback(
    async () => {
      try {
        const txHash = await claimFarm(masterChefContract, pid)
        const receipt = await txHash.wait()
        return receipt.status
      } catch (err) {
        return false
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [masterChefContract, pid, account],
  )
  return { onClaimFarm: handleClaimFarm }
}

export default useClaimFarm
