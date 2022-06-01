import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import useRefresh from 'hooks/useRefresh'
import { getCrssReferralContract } from 'utils/contractHelpers'

function useReferralCommisions() {
  const [referralCommissions, setReferralCommissions] = useState(0)
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()
  const referralContract = getCrssReferralContract()

  const getCount = useCallback(async () => {
    if (account) {
      const data = await referralContract.totalReferralCommissions(account, {})
      setReferralCommissions(data.toNumber())
    }
  }, [referralContract, account])

  useEffect(() => {
    getCount()
  }, [slowRefresh, getCount])

  return referralCommissions
}

export default useReferralCommisions
