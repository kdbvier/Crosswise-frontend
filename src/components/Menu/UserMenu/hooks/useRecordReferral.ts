import { useCallback } from 'react'
import { recordRefer } from 'utils/calls'
import { useCrssReferralContract } from 'hooks/useContract'

const useRecordReferrer = (user: string, referrer: string) => {
  let referUser = ''

  const crssReferralContract = useCrssReferralContract()

  const handleRecord = useCallback(async () => {
    const txHash = await recordRefer(crssReferralContract, user, referUser)
    console.info(txHash)
  }, [crssReferralContract, user, referUser])

  try {
    const query = new URLSearchParams(window.location.search)
    const ref = query.get('ref')
    if (ref !== null && ref !== '') {
      referUser = window.atob(ref)
    } else {
      return { state: 'There is no ref link' }
    }
  } catch {
    return { state: 'Invalid referral link' }
  }

  return { onRecord: handleRecord }
}

export default useRecordReferrer
