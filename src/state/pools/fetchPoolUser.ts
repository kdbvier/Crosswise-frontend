import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { PoolConfig } from 'config/constants/types'

export const AutoOption = [
  { autoCompound: false, isVesting: false },
  { autoCompound: true, isVesting: false },
  { autoCompound: true, isVesting: true },
  { autoCompound: false, isVesting: true },
]

export const fetchPoolUserAllowances = async (account: string, poolsToFetch: PoolConfig[]) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = poolsToFetch.map((pool) => {
    const lpContractAddress = getAddress(pool.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchPoolUserTokenBalances = async (account: string, poolsToFetch: PoolConfig[]) => {
  const calls = poolsToFetch.map((pool) => {
    const lpContractAddress = getAddress(pool.lpAddresses)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchPoolUserInfo = async (account: string, poolsToFetch: PoolConfig[]) => {
  const masterChefAddress = getMasterChefAddress()
  let userStateCalls = []
  const userInfoCalls = []
  const subPoolCrssCall = []
  const vestingListCall = []

  userStateCalls = poolsToFetch.map((farm) => {
    userInfoCalls.push({
      address: masterChefAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    })
    subPoolCrssCall.push({
      address: masterChefAddress,
      name: 'getSubPooledCrss',
      params: [farm.pid, account],
    })
    vestingListCall.push({
      address: masterChefAddress,
      name: 'getVestList',
      params: [farm.pid, account],
    })
    return {
      address: masterChefAddress,
      name: 'getUserState',
      params: [farm.pid, account],
    }
  })

  const rawUserState = await multicall(masterchefABI, userStateCalls)

  const rawUserInfo = await multicall(masterchefABI, userInfoCalls)

  const rawSubPooledCrss = await multicall(masterchefABI, subPoolCrssCall)

  const rawVestingList = await multicall(masterchefABI, vestingListCall)

  const parsedStakedBalances = rawUserState.map((userStateItem, index) => {
    const userState = userStateItem[0]
    const userInfo = rawUserInfo[index]
    const subPooledCrss = rawSubPooledCrss[index][0]
    const vestingList = rawVestingList[index][0]

    const pendingCrss = userState.pendingCrss.add(subPooledCrss.toAccumulate).add(subPooledCrss.toVest)
    return {
      stakedBalance: new BigNumber(userState.rewardPayroll._hex).toJSON(),
      accumulatedRewards: new BigNumber(userState.accRewards._hex).toJSON(),
      pendingCrss: new BigNumber(pendingCrss._hex).toJSON(),
      claimedRewards: new BigNumber(userInfo.accumulated._hex).toJSON(),
      vestingRewards: new BigNumber(userState.totalVest._hex).toJSON(),
      vestingList: vestingList.map((listItem) =>
        listItem && listItem.length
          ? {
              principal: new BigNumber(listItem.principal._hex).toJSON(),
              startTime: new BigNumber(listItem.startTime._hex).toJSON(),
              withdrawn: new BigNumber(listItem.withdrawn._hex).toJSON(),
            }
          : [],
      ),
      ...AutoOption[userState.collectOption || 0],
    }
  })
  return parsedStakedBalances
}

export const fetchFarmUserStakedBalances = async (account: string, farmsToFetch: PoolConfig[]) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'stakedTokens',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string, farmsToFetch: PoolConfig[]) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'getUserState',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}

export const fetchFarmUserOption = async (account: string, farmsToFetch: PoolConfig[]) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawOption = await multicall(masterchefABI, calls)
  const parsedOption = rawOption.map((auto) => {
    return [auto.isAuto, auto.isVest]
  })
  return parsedOption
}
