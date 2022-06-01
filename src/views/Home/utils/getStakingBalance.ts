import { getCrossPairContract, getMasterchefContract } from 'utils/contractHelpers'
import BigNumber from 'bignumber.js'

interface Call {
  pid: any
  address: string // address of user
  pairAddress: string
}

const getStakingBalance = async <T = any>(calls: Call): Promise<any> => {
  try {
    const masterChefContract = getMasterchefContract()
    const crossPairContract = getCrossPairContract(calls.pairAddress)
    const { _reserve0, _reserve1 } = await crossPairContract.getReserves()
    const { amount: lpBalance } = await masterChefContract.userInfo(calls.pid, calls.address)
    const lpTotalSupply = await crossPairContract.totalSupply()
    const reserve0InBigNumber = new BigNumber(_reserve0._hex)
    const reserve1InBigNumber = new BigNumber(_reserve1._hex)
    const lpBalanceInBigNumber = new BigNumber(lpBalance._hex)
    const lpTotalSupplyInBigNumber = new BigNumber(lpTotalSupply._hex)
    const lpRate = lpBalanceInBigNumber.div(lpTotalSupplyInBigNumber)
    return [reserve0InBigNumber, reserve1InBigNumber, lpRate]
  } catch (error: any) {
    throw new Error(error)
  }
}

export default getStakingBalance
