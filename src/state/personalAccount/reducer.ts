import { createReducer } from '@reduxjs/toolkit'
import { setUserInfo, setTransacInfo } from './actions'

export interface BurnState {
  readonly status: boolean
  readonly data: any
  readonly transacStatus: boolean
  readonly transacData: any
}

const initialState: BurnState = {
  status: false,
  data: {},
  transacData: {},
  transacStatus: false,
}

export default createReducer<BurnState>(initialState, (builder) =>
  builder
    .addCase(setUserInfo, (state, { payload: { data, status } }) => {
      return {
        ...state,
        data,
        status,
      }
    })
    .addCase(setTransacInfo, (state, { payload: { data, status } }) => {
      return {
        ...state,
        transacData: data,
        transacStatus: status,
      }
    }),
)
