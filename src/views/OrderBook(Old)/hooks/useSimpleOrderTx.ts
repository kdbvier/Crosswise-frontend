import { useEffect, useRef } from 'react'
import { ethers } from 'ethers'
import { format } from 'date-fns'

import { CRSS, WBNB } from 'config/constants/tokens'

import useActiveWeb3React from 'hooks/useActiveWeb3React'
// import { useFarmFromPid } from 'state/farms/hooks'
import { localToUTC } from 'utils/formatTimePeriod'
import { simpleWssProvider } from 'utils/providers'

import { SimpleOrderTxTypes } from '../types'

const swapAbi = [
  'event Swap(address indexed sender, uint amount0In, uint amount1In, uint amount0Out, uint amount1Out, address indexed to)',
]

const lpAddress = '0xdD901faf9652D474b0A70263E13DA294990d49AE' // BOGGED + BNB LPs

const pending = []

const getAmountsFromSwapArgs = (swapArgs) => {
  const { amount0In, amount1In, amount0Out, amount1Out } = swapArgs
  // 1. The eq method is for objects created
  //    from ethers.js BigNumber helper
  // 2. Note, this code only handles simple one-to-one token swaps.
  //    (It's also possible to swap both token0 and token1 for token0 and token1)
  let isBuy = false
  let token0AmountBigDecimal = amount0In
  if (token0AmountBigDecimal.eq(0)) {
    token0AmountBigDecimal = amount0Out
    isBuy = true
  }

  let token1AmountBigDecimal = amount1In
  if (token1AmountBigDecimal.eq(0)) {
    token1AmountBigDecimal = amount1Out
  }

  return { isBuy, token0AmountBigDecimal, token1AmountBigDecimal }
}

const convertSwapEventToPrice = ({ swapArgs, token0Decimals, token1Decimals }) => {
  const { isBuy, token0AmountBigDecimal, token1AmountBigDecimal } = getAmountsFromSwapArgs(swapArgs)

  const token0AmountFloat = parseFloat(ethers.utils.formatUnits(token0AmountBigDecimal, token0Decimals))
  const token1AmounFloat = parseFloat(ethers.utils.formatUnits(token1AmountBigDecimal, token1Decimals))

  if (token1AmounFloat > 0) {
    const priceOfToken0InTermsOfToken1 = token0AmountFloat / token1AmounFloat
    return {
      isBuy,
      price: priceOfToken0InTermsOfToken1,
      volume: token0AmountFloat,
    }
  }

  return null
}

const useSimpleOrderTx = () => {
  const { library, chainId } = useActiveWeb3React()
  // const farm = useFarmFromPid(0) // CRSS-BNB Farm
  const tokenContract = useRef(null)

  const pullNewTx = (): SimpleOrderTxTypes[] => {
    const tempPending = pending.splice(0, pending.length)

    const parsed = tempPending.map((tx) => {
      return {
        isBuy: tx.isBuy,
        tradeFrom: {
          symbol: tx.isBuy ? WBNB[chainId].symbol : CRSS[chainId].symbol,
          address: tx.isBuy ? WBNB[chainId].address : CRSS[chainId].address,
        },
        amountFrom: tx.isBuy ? tx.amount / tx.price : tx.amount,
        tradeTo: {
          symbol: tx.isBuy ? CRSS[chainId].symbol : WBNB[chainId].symbol,
          address: tx.isBuy ? CRSS[chainId].address : WBNB[chainId].address,
        },
        amountTo: tx.isBuy ? tx.amount : tx.amount / tx.price,
        txDate: format(localToUTC(tx.ts * 1000), 'yyyy-MM-dd HH:mm:ss'),
        txLink: tx.transactionHash,
      }
    })

    return parsed
  }

  useEffect(() => {
    tokenContract.current = new ethers.Contract(lpAddress, swapAbi, simpleWssProvider)

    const filterSwap = tokenContract.current.filters.Swap()
    tokenContract.current.on(filterSwap, async (sender, amount0In, amount1In, amount0Out, amount1Out, to, event) => {
      const { isBuy, price, volume } = convertSwapEventToPrice({
        swapArgs: event.args,
        token0Decimals: CRSS[chainId].decimals,
        token1Decimals: WBNB[chainId].decimals,
      })

      const block = await event.getBlock() // library.getBlock(event.blockNumber)

      pending.push({
        isBuy,
        price, // BNB / BOGGED
        amount: volume,
        ts: block.timestamp,
        transactionHash: event.transactionHash,
      })
    })

    return () => {
      if (tokenContract.current) {
        tokenContract.current.removeAllListeners()
      }
    }
  }, [chainId, library])

  return { pullNewTx }
}

export default useSimpleOrderTx
