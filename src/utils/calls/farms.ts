import BigNumber from 'bignumber.js'
// import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL, DEFAULT_REFERRER_ADDRESS } from 'config'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  // if (pid === 0) {
  //   const tx = await masterChefContract.enterStaking(value, options)
  //   const receipt = await tx.wait()
  //   return receipt.status
  // }

  // Consider auto-compound and vesting feature for deposit method
  const tx = await masterChefContract.deposit(pid, value)
  const receipt = await tx.wait()
  return receipt.status
}

export const unstakeFarm = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  // if (pid === 0) {
  //   const tx = await masterChefContract.leaveStaking(value, options)
  //   const receipt = await tx.wait()
  //   return receipt.status
  // }

  const tx = await masterChefContract.withdraw(pid, value, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestFarm = async (masterChefContract, pid) => {
  // if (pid === 0) {
  //   const tx = await await masterChefContract.leaveStaking('0', options)
  //   const receipt = await tx.wait()
  //   return receipt.status
  // }

  const tx = await masterChefContract.withdraw(pid, '0', options)
  const receipt = await tx.wait()
  return receipt.status
}

export const massHarvestFarm = async (masterChefContract) => {
  // if (pid === 0) {
  //   const tx = await await masterChefContract.leaveStaking('0', options)
  //   const receipt = await tx.wait()
  //   return receipt.status
  // }

  // const tx = await masterChefContract.massHarvest(pids, options)
  // const receipt = await tx.wait()
  // return receipt.status

  const tx = await masterChefContract.massHarvestRewards()
  const receipt = await tx.wait()
  return receipt.status
}

export const massStakeFarm = async (masterChefContract, pids) => {
  // if (pid === 0) {
  //   const tx = await await masterChefContract.leaveStaking('0', options)
  //   const receipt = await tx.wait()
  //   return receipt.status
  // }

  const tx = await masterChefContract.massStakeReward(pids, options)
  const receipt = await tx.wait()
  return receipt.status
}

export const switchCollectOption = async (masterChefContract, pid, option) => {
  const tx = await masterChefContract.switchCollectOption(pid, option)
  const receipt = await tx.wait()
  return receipt.status
}

export const claimFarm = async (masterChefContract, pid) => {
  const tx = await masterChefContract.deposit(pid, 0)
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestStakeFarm = async (masterChefContract, pid) => {
  const tx = await masterChefContract.stakeAccumulated(pid)
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestWithdrawFarm = async (masterChefContract, pid) => {
  const tx = await masterChefContract.harvestAccumulated(pid)
  const receipt = await tx.wait()
  return receipt.status
}

export const vestWithdrawFarm = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const tx = await masterChefContract.withdrawVest(pid, value)
  const receipt = await tx.wait()
  return receipt.status
}
