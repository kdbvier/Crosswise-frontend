import React from 'react'
import { Currency } from '@crosswise/sdk'

export interface CoinPriceDataType {
  rank: number
  token: string
  volume: number
  price: number
  changeInDay: number
  changeInWeek: number
}
