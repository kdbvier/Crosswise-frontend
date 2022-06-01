import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AppDispatch, AppState, useAppDispatch } from '../index'
import { setUserInfo, setTransacInfo } from './actions'

export function useUserInfo(): AppState['personalAccount'] {
  return useSelector<AppState, AppState['personalAccount']>((state) => state.personalAccount)
}

export const fetchUserInfo = (address) => (dispatch) => {
  axios
    .get(`https://api.crosswise.finance/v1/user_info/${address}`)
    .then((info) => {
      dispatch(setUserInfo({ status: info.data.status, data: info.data.data }))
    })
    .catch((err) => console.log(err))
}

export const registerUserInfo = (data, onSuccess, onFailure) => (dispatch) => {
  axios
    .post(`https://api.crosswise.finance/v1/user_info/${data.walletAddress}`, { ...data })
    .then((info) => {
      onSuccess()
      dispatch(setUserInfo({ status: info.data.status, data: info.data.data }))
    })
    .catch((err) => onFailure(err))
}

export const fetchTransacInfo = (address) => (dispatch) => {
  axios.get(`https://api.crosswise.finance/v1/wallet_info/address/${address}`).then((info) => {
    dispatch(setTransacInfo({ status: info.data.status, data: info.data.data }))
  })
}
