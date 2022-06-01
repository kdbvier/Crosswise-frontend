import Web3 from 'web3'
import * as ethers from 'ethers'
import { Contract } from 'ethers'
import BigNumber from 'bignumber.js'
import { TAKER_ADDRESS, PANCAKE_ROUTER_ADDRESS, CRSS_TOKEN_ADDRESS } from 'config/constants'
import { BUSD, WBNB } from 'config/constants/tokens'
import tokenAbi from 'config/abi/erc20.json'
import routerABI from 'config/abi/pancakeRouter.json'
import takerABI from 'config/abi/crssTaker.json'
import { getChainLinkContract } from 'utils/contractHelpers'
import { BIG_TEN } from 'utils/bigNumber'
import { web3Provider, ethWeb3Provider, simpleRpcProvider, simpleRpcETHProvider } from './providers'

const routerAbi: any = routerABI
const takerAbi: any = takerABI
const bnbWeb3 = new Web3(web3Provider)

const ethWeb3 = new Web3(ethWeb3Provider)
const uniV2: any = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
const uniRouterContract = new ethWeb3.eth.Contract(routerAbi, uniV2)
const daiAddr = '0x6b175474e89094c44da98b954eedeac495271d0f'
const wETHAddr = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

export const getTokenPrice: any = async (tokenAddress, chainId) => {
  return new Promise((resolve) => {
    const pancakeRouterContract = new bnbWeb3.eth.Contract(routerAbi, PANCAKE_ROUTER_ADDRESS[chainId])
    const crssTakerContract = new bnbWeb3.eth.Contract(takerAbi, TAKER_ADDRESS[chainId])

    if (tokenAddress === WBNB[chainId].address) {
      const path = [WBNB[chainId].address, BUSD[chainId].address]
      const routerContract = CRSS_TOKEN_ADDRESS[chainId] === tokenAddress ? crssTakerContract : pancakeRouterContract
      routerContract.methods
        .getAmountsOut(bnbWeb3.utils.toBN(1 * 10 ** 18), path)
        .call()
        .then((data) => resolve(parseFloat(ethers.utils.formatUnits(`${data[data.length - 1]}`, 18))))
    } else {
      const path = [tokenAddress, WBNB[chainId].address, BUSD[chainId].address]
      const routerContract = CRSS_TOKEN_ADDRESS[chainId] === tokenAddress ? crssTakerContract : pancakeRouterContract
      const tokenContract = new Contract(tokenAddress, tokenAbi, simpleRpcProvider)
      tokenContract.decimals().then((result) => {
        routerContract.methods
          .getAmountsOut(bnbWeb3.utils.toBN(1 * 10 ** result), path)
          .call()
          .then((data) => resolve(parseFloat(ethers.utils.formatUnits(`${data[data.length - 1]}`, 18))))
      })
    }
  })
}

export const getTokenPriceETH: any = (tokenAddress, chainId) => {
  return new Promise((resolve) => {
    if (tokenAddress === wETHAddr) {
      const path = [wETHAddr, daiAddr]
      const routerContract = uniRouterContract
      routerContract.methods
        .getAmountsOut(ethWeb3.utils.toBN(1 * 10 ** 18), path)
        .call()
        .then((data) => resolve(parseFloat(ethers.utils.formatUnits(`${data[data.length - 1]}`, 18))))
    } else {
      const path = [tokenAddress, wETHAddr, daiAddr]
      const routerContract = uniRouterContract
      const tokenContract = new Contract(tokenAddress, tokenAbi, simpleRpcETHProvider)
      tokenContract.decimals().then((result) => {
        routerContract.methods
          .getAmountsOut(bnbWeb3.utils.toBN(1 * 10 ** result), path)
          .call()
          .then((data) => resolve(parseFloat(ethers.utils.formatUnits(`${data[data.length - 1]}`, 18))))
      })
    }
  })
}

export const getBnbPrice = async () => {
  const chainLinkContract = getChainLinkContract()
  const bnbPrice = await chainLinkContract.getTokenPrice('0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd')
  const bnbPriceInBigNumber = new BigNumber(bnbPrice._hex)
  return bnbPriceInBigNumber.div(BIG_TEN.pow(8)).toNumber()
}

export const getBusdPrice = async () => {
  const chainLinkContract = getChainLinkContract()
  const busdPrice = await chainLinkContract.getTokenPrice('0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee')
  const busdPriceInBigNumber = new BigNumber(busdPrice._hex)
  return busdPriceInBigNumber.div(BIG_TEN.pow(8)).toNumber()
}
