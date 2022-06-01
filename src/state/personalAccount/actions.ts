import { createAction } from '@reduxjs/toolkit'

export const setUserInfo = createAction<{ status: boolean; data: any }>('personalAccount/getUserInfo')
export const setTransacInfo = createAction<{ status: boolean; data: any }>('personalAccount/getTransacInfo')
