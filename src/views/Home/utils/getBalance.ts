import { getMasterchefContract } from 'utils/contractHelpers'

interface Call {
  pid: any // farm id
  address: string // address of user
  param: string
}

const getBalance = async <T = any>(calls: Call): Promise<T> => {
  try {
    const masterChefContract = getMasterchefContract()
    const userState = await masterChefContract.getUserState(calls.pid, calls.address)
    return userState[calls.param]
  } catch (error: any) {
    console.log('getUserStateError: ', error)
    throw new Error(error)
  }
}

export default getBalance
