import { ethers } from 'ethers'
import Web3 from 'web3'
import { getNodeUrl, getRpcUrl } from 'utils/getRpcUrl'
import chainIds from 'config/constants/chainIds'

// const RPC_URL = getRpcUrl()
const RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545'
const BNB_RPC_URL = getNodeUrl(chainIds.BNB_CHAIN_ID)
const ETH_RPC_URL = getNodeUrl(chainIds.ETH_CHAIN_ID)
// delete
export const simpleWssProvider = new ethers.providers.WebSocketProvider(
  'wss://speedy-nodes-nyc.moralis.io/74ef8961baa2e25faa50a65f/bsc/mainnet/archive/ws',
)

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)
// export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(BNB_RPC_URL)
export const simpleRpcETHProvider = new ethers.providers.JsonRpcProvider(ETH_RPC_URL)
export const web3Provider = new Web3.providers.HttpProvider(BNB_RPC_URL)
export const ethWeb3Provider = new Web3.providers.HttpProvider(ETH_RPC_URL)

export function getProvider(chainId: number) {
  let provider
  switch (chainId) {
    case chainIds.BNB_TEST_CHAIN_ID:
    case chainIds.BNB_CHAIN_ID:
      provider = simpleRpcProvider
      break
    case chainIds.RINKEBY_CHAIN_ID:
    case chainIds.ETH_CHAIN_ID:
      provider = simpleRpcETHProvider
      break
    default:
      provider = simpleRpcProvider
      break
  }
  return provider
}

// export const web3ArchiveProvider = new Web3.providers.HttpProvider("https://bsc.getblock.io/mainnet/?api_key=249a480d-6030-4050-9bcc-cf35941da929");
// export const web3ArchiveProvider = new Web3.providers.HttpProvider("https://speedy-nodes-nyc.moralis.io/fbb4b2b82993bf507eaaab13/bsc/mainnet/archive")
export const web3ArchiveProvider = new Web3.providers.HttpProvider('https://nodes.pancakeswap.com')

export const WEBSOCKET_URL = process.env.REACT_APP_WSNODE_1
// export const simpleWebsocketProvider = new ethers.providers.WebSocketProvider(WEBSOCKET_URL)

export default simpleRpcProvider
