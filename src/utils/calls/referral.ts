import { DEFAULT_GAS_LIMIT } from 'config'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const recordRefer = async (crssReferralContract, _user, _referrer) => {
  const tx = await crssReferralContract.recordReferral(_user, _referrer, options)
  const receipt = await tx.wait()
  return receipt.status
}
