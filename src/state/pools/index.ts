import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import poolsConfig from 'config/constants/pools'
import { BIG_ZERO } from 'utils/bigNumber'
import { PoolsState, Pool, CakeVault, VaultFees, VaultUser, AppThunk } from 'state/types'
import priceHelperLpsConfig from 'config/constants/priceHelperLps'
import fetchPools from './fetchPools'
import { fetchPoolUserAllowances, fetchPoolUserTokenBalances, fetchPoolUserInfo } from './fetchPoolUser'

const noAccountPoolConfig = poolsConfig.map((pool) => ({
  ...pool,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: '0',
    vestingList: [],
    earnings: '0',
    isAuto: false,
    isVest: false,
  },
}))

const initialState: PoolsState = {
  data: noAccountPoolConfig,
  loadArchivedPoolsData: false,
  userDataLoaded: false,
}

// Thunks

export const fetchPoolsPublicDataAsync = createAsyncThunk<Pool[], number[]>(
  'pools/fetchPoolsPublicDataAsync',
  async (pids) => {
    const poolsToFetch = poolsConfig.filter((poolConfig) => pids.includes(poolConfig.pid))
    const poolsWithPriceHelpers = poolsToFetch.concat(priceHelperLpsConfig)
    const pools = await fetchPools(poolsWithPriceHelpers)
    return pools
  },
)

interface PoolUserDataResponse {
  pid: number
  allowance: string
  tokenBalance: string
  stakedBalance: string
  pendingCrss: string
  accumulatedRewards: string
  vestingList: any
  earnings: string
  isAuto: boolean
  isVest: boolean
}

export const fetchPoolUserDataAsync = createAsyncThunk<PoolUserDataResponse[], { account: string; pids: number[] }>(
  'pools/fetchPoolUserDataAsync',
  async ({ account, pids }) => {
    const poolsToFetch = poolsConfig.filter((poolConfig) => pids.includes(poolConfig.pid))
    const userPoolAllowances = await fetchPoolUserAllowances(account, poolsToFetch)
    const userPoolTokenBalances = await fetchPoolUserTokenBalances(account, poolsToFetch)
    const userPoolInfo = await fetchPoolUserInfo(account, poolsToFetch)

    return userPoolAllowances.map((poolAllowance, index) => {
      const userEarnings = new BigNumber(userPoolInfo[index].pendingCrss)
        .plus(new BigNumber(userPoolInfo[index].accumulatedRewards))
        .toJSON()
      return {
        pid: poolsToFetch[index].pid,
        allowance: poolAllowance,
        tokenBalance: userPoolTokenBalances[index],
        stakedBalance: userPoolInfo[index]?.stakedBalance,
        accumulatedRewards: userPoolInfo[index]?.accumulatedRewards,
        vestingRewards: userPoolInfo[index]?.vestingRewards,
        vestingList: userPoolInfo[index]?.vestingList,
        pendingCrss: userPoolInfo[index]?.pendingCrss,
        earnings: userEarnings,
        isAuto: userPoolInfo[index].autoCompound,
        isVest: userPoolInfo[index].isVesting,
      }
    })
  },
)

export const poolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setLoadArchivedPoolsData: (state, action) => {
      const loadArchivedPoolsData = action.payload
      state.loadArchivedPoolsData = loadArchivedPoolsData
    },
  },
  extraReducers: (builder) => {
    // Update pools with live data
    builder.addCase(fetchPoolsPublicDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((pool) => {
        const livePoolData = action.payload.find((poolData) => poolData.pid === pool.pid)
        return { ...pool, ...livePoolData }
      })
    })

    // Update pools with user data
    builder.addCase(fetchPoolUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl
        const index = state.data.findIndex((pool) => pool.pid === pid)
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
      state.userDataLoaded = true
    })
  },
})

// Actions
export const { setLoadArchivedPoolsData } = poolsSlice.actions

export default poolsSlice.reducer
