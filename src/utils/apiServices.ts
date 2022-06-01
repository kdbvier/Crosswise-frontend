import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
// import { ethers } from 'ethers'
import axios from 'axios'
// import { WBNB_ADDRESS, WETH_ADDRESS, BUSD_ADDRESS, PANCAKE_V2_ROUTER, DAI_ADDRESS } from 'config/constants/addresses'
import { WBNB_ADDRESS } from 'config/constants/addresses'

import abi from '../config/abi/erc20ABI.json'
import { web3Provider, ethWeb3Provider } from './providers'
import { getTokenPrice, getTokenPriceETH } from './priceProvider'

const web3 = new Web3(web3Provider)
const web3ETH = new Web3(ethWeb3Provider)

const config = {
  headers: {
    'X-API-KEY': 'BQYlumjpRuGovef38yDGeTI00jkER2Zj',
  },
}

async function getTokenDetails(address: string, routerVersion: string, chainId = 56) {
  if (!address) {
    return null
  }
  const tokenContract =
    chainId === 56
      ? new web3.eth.Contract(abi as AbiItem[], address)
      : new web3ETH.eth.Contract(abi as AbiItem[], address)
  const name = await tokenContract.methods.name().call()
  const symbol = await tokenContract.methods.symbol().call()
  const nativeCurrentySymbol = chainId === 56 ? 'BNB' : 'ETH'
  return { name, symbol, pair: `${symbol}/${nativeCurrentySymbol}`, version: routerVersion }
}

async function getTokenInfoForChart(input: any, quoteAddress: any, pair: any, routerVersion: any, chainId = 56) {
  let query
  const minutes = 5
  const network = chainId === 56 ? 'bsc' : 'ethereum'
  const exchangeName = chainId === 56 ? `Pancake ${routerVersion}` : 'Uniswap'
  if (routerVersion === 'crss') {
    query = `{
        ethereum(network: ${network}) {
          dexTrades(
            options: {limit: 1, desc: "timeInterval.minute"}
            smartContractAddress: {is: "${pair}"}
            protocol: {is: "Uniswap v2"}
            baseCurrency: {is: "${input}"}
            quoteCurrency: {is: "${quoteAddress}"}
          ) {
            timeInterval {
              minute(count: ${minutes})
            }
            baseCurrency {
              symbol
              name
              address
            }
            open_price: minimum(of: time, get: quote_price)
          }
        }
      }
      `
  } else {
    query = `{
      ethereum(network: ${network}) {
        dexTrades(
          options: {limit: 1, desc: "timeInterval.minute"}
          protocol: {is: "Uniswap v2"}
          exchangeName: {is: "${exchangeName}"}
          baseCurrency: {is: "${input}"}
          quoteCurrency: {is: "${quoteAddress}"}
        ) {
          timeInterval {
            minute(count: ${minutes})
          }
          baseCurrency {
            symbol
            name
            address
          }
          open_price: minimum(of: time, get: quote_price)
        }
      }
    }
    `
  }

  const url = `https://graphql.bitquery.io/`
  const {
    data: {
      data: {
        ethereum: { dexTrades },
      },
    },
  } = await axios.post(url, { query }, config)

  const quoteTokenPrice = chainId === 56 ? await getTokenPrice(quoteAddress) : await getTokenPriceETH(quoteAddress)

  return new Promise((resolve, reject) => {
    try {
      const price = dexTrades[0].open_price * quoteTokenPrice
      if (price > 1) {
        resolve({
          priceScale: 100,
          symbol: dexTrades[0].baseCurrency.symbol,
          name: dexTrades[0].baseCurrency.name,
        })
      } else {
        let scale = 1
        let tempPrice = price
        for (;;) {
          scale *= 10
          tempPrice *= 10
          if (tempPrice > 100) {
            break
          }
        }
        resolve({
          priceScale: scale,
          symbol: dexTrades[0].baseCurrency.symbol,
          name: dexTrades[0].baseCurrency.name,
        })
      }
    } catch (error) {
      getTokenDetails(input, routerVersion, chainId)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
}
async function getChartData(
  input: any,
  quoteAddress: any,
  pair: any,
  resolution: any,
  routerVersion: any,
  chainId = 56,
) {
  const resolutionMap = {
    1: 1,
    5: 5,
    10: 10,
    15: 15,
    30: 30,
    60: 60,
    '1H': 60,
    '2H': 120,
    '1D': 1440,
    '1W': 1440 * 7,
    '1M': 1440 * 30,
  }
  const minutes = resolutionMap[resolution]
  const network = chainId === 56 ? 'bsc' : 'ethereum'
  const exchangeName = chainId === 56 ? `Pancake ${routerVersion}` : 'Uniswap'
  let query
  if (routerVersion === 'crss') {
    query = `{
        ethereum(network: ${network}) {
          dexTrades(
            options: {limit: 320, desc: "timeInterval.minute"}
            smartContractAddress: {is: "${pair}"}
            protocol: {is: "Uniswap v2"}
            baseCurrency: {is: "${input}"}
            quoteCurrency: {is: "${quoteAddress}"}
          ) {
            exchange {
              name
            }
            timeInterval {
              minute(count: ${minutes})
            }
            baseCurrency {
              symbol
              address
            }
            baseAmount
            quoteCurrency {
              symbol
              address
            }
            quoteAmount
            trades: count
            maximum_price: quotePrice(calculate: maximum)
            minimum_price: quotePrice(calculate: minimum)
            open_price: minimum(of: time, get: quote_price)
            close_price: maximum(of: time, get: quote_price)
            tradeAmount(in: USD, calculate: sum)
          }
        }
      }
      `
  } else {
    query = `{
      ethereum(network: ${network}) {
        dexTrades(
          options: {limit: 320, desc: "timeInterval.minute"}
          protocol: {is: "Uniswap v2"}
          exchangeName: {is: "${exchangeName}"}
          baseCurrency: {is: "${input}"}
          quoteCurrency: {is: "${quoteAddress}"}
        ) {
          exchange {
            name
          }
          timeInterval {
            minute(count: ${minutes})
          }
          baseCurrency {
            symbol
            address
          }
          baseAmount
          quoteCurrency {
            symbol
            address
          }
          quoteAmount
          trades: count
          maximum_price: quotePrice(calculate: maximum)
          minimum_price: quotePrice(calculate: minimum)
          open_price: minimum(of: time, get: quote_price)
          close_price: maximum(of: time, get: quote_price)
          tradeAmount(in: USD, calculate: sum)
        }
      }
    }
    `
  }
  const url = `https://graphql.bitquery.io/`
  let {
    data: {
      data: {
        ethereum: { dexTrades },
      },
    },
  } = await axios.post(url, { query }, config)

  dexTrades = dexTrades.reverse()
  // const quoteTokenPrice = chainId === 1 ? await getTokenPriceETH(quoteAddress) : await getTokenPrice(quoteAddress)
  return new Promise((resolve, reject) => {
    try {
      const data = dexTrades.map((trade) => {
        const dateTest = trade.timeInterval.minute
        const year = dateTest.slice(0, 4)
        const month = dateTest.slice(5, 7)
        const day = dateTest.slice(8, 10)
        const hour = dateTest.slice(11, 13)
        const minute = dateTest.slice(14, 16)
        const date = new Date(`${month}/${day}/${year} ${hour}:${minute}:00 UTC`)
        return {
          open: trade.open_price,
          close: trade.close_price,
          low: trade.minimum_price,
          high: trade.maximum_price,
          volume: trade.tradeAmount,
          time: date.getTime(),
        }
      })
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}
async function getMarksData(account: any, input: any, chainId = 56) {
  const network = chainId === 1 ? 'ethereum' : 'bsc'
  const query = `{
    ethereum(network: ${network}) {
      dexTrades(
        options: {desc: "block.height"}
        baseCurrency: {in: ["${WBNB_ADDRESS}", "0x55d398326f99059ff775485246999027b3197955", "0xe9e7cea3dedca5984780bafc599bd69add087d56", "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"]}
        quoteCurrency: {is: "${input}"}
        txSender: {is: "${account}"}
      ) {
        transaction {
          hash
        }
        smartContract {
          address {
            address
          }
          contractType
          currency {
            name
          }
        }
        tradeIndex
        block {
          timestamp {
            unixtime
          }
          height
        }
        buyAmount
        buyAmountInUsd: buyAmount(in: USD)
        buyCurrency {
          symbol
          address
        }
        sellAmount
        sellAmountInUsd: sellAmount(in: USD)
        sellCurrency {
          symbol
          address
        }
        sellAmountInUsd: sellAmount(in: USD)
        tradeAmount(in: USD)
        transaction {
          gasValue
          gasPrice
          gas
        }
      }
    }
  }
  `

  const url = `https://graphql.bitquery.io/`
  const {
    data: {
      data: {
        ethereum: { dexTrades },
      },
    },
  } = await axios.post(url, { query }, config)

  if (dexTrades.length === 0) {
    return new Promise((resolve) => {
      resolve([])
    })
  }

  return new Promise((resolve, reject) => {
    try {
      const data = dexTrades.map((trade) => {
        return {
          buyAmount: trade.buyAmount,
          buyCurrency: trade.buyCurrency.symbol,
          sellAmount: trade.sellAmount,
          sellCurrency: trade.sellCurrency.symbol,
          tradeAmount: trade.tradeAmount,
          time: trade.block.timestamp.unixtime,
        }
      })
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}
async function getChartDurationData(
  input: any,
  quoteAddress: any,
  pair: any,
  resolution: any,
  to: any,
  countBack: any,
  chainId = 56,
) {
  const resolutionMap = {
    1: 1,
    5: 5,
    10: 10,
    15: 15,
    30: 30,
    60: 60,
    '1H': 60,
    '1D': 1440,
    '1W': 1440 * 7,
    '1M': 1440 * 30,
  }
  const minutes = resolutionMap[resolution]
  const network = chainId === 1 ? 'ethereum' : 'bsc'
  const query = `{
      ethereum(network: ${network}) {
        dexTrades(
          options: {limit: ${countBack}, desc: "timeInterval.minute"}
          smartContractAddress: {is: "${pair}"}
          protocol: {is: "Uniswap v2"}
          baseCurrency: {is: "${input}"}
          quoteCurrency: {is: "${quoteAddress}"}
          time: {before: "${to}"}
        ) {
          exchange {
            name
          }
          timeInterval {
            minute(count: ${minutes})
          }
          baseCurrency {
            symbol
            address
          }
          baseAmount
          quoteCurrency {
            symbol
            address
          }
          quoteAmount
          trades: count
          maximum_price: quotePrice(calculate: maximum)
          minimum_price: quotePrice(calculate: minimum)
          open_price: minimum(of: time, get: quote_price)
          close_price: maximum(of: time, get: quote_price)
          tradeAmount(in: USD, calculate: sum)
        }
      }
    }
    `

  const url = `https://graphql.bitquery.io/`
  let {
    data: {
      data: {
        ethereum: { dexTrades },
      },
    },
  } = await axios.post(url, { query }, config)

  dexTrades = dexTrades.reverse()

  const quoteTokenPrice = chainId === 1 ? await getTokenPriceETH(quoteAddress) : await getTokenPrice(quoteAddress)

  return new Promise((resolve, reject) => {
    try {
      const data = dexTrades.map((trade) => {
        const dateTest = trade.timeInterval.minute
        const year = dateTest.slice(0, 4)
        const month = dateTest.slice(5, 7)
        const day = dateTest.slice(8, 10)
        const hour = dateTest.slice(11, 13)
        const minute = dateTest.slice(14, 16)
        const date = new Date(`${month}/${day}/${year} ${hour}:${minute}:00 UTC`)
        return {
          open: trade.open_price * quoteTokenPrice,
          close: trade.close_price * quoteTokenPrice,
          low: trade.minimum_price * quoteTokenPrice,
          high: trade.maximum_price * quoteTokenPrice,
          volume: trade.tradeAmount,
          time: date.getTime(),
        }
      })
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}
export {
  // getTokenDetails,
  // getChartStats,
  // socialToken,
  // topTrades,
  // getPrice,
  getChartData,
  getMarksData,
  getChartDurationData,
  getTokenInfoForChart,
}

export default getTokenDetails
