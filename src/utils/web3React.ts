import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { ConnectorNames } from '@crosswise/uikit'
import { ethers } from 'ethers'
// import { Biconomy } from '@biconomy/mexa'
// import { BICONOMY_API_KEY } from 'config'
import { getRpcUrl } from './getRpcUrl'

const POLLING_INTERVAL = 12000
const rpcUrl = getRpcUrl()
// const rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/";
// const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
const chainId = 97

const injected = new InjectedConnector({ supportedChainIds: [chainId] })

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  bridge: 'https://pancakeswap.bridge.walletconnect.org/',
  qrcode: true,
  // pollingInterval: POLLING_INTERVAL,
})

const bscConnector = new BscConnector({ supportedChainIds: [chainId] })

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector,
  [ConnectorNames.Coinbase]: async () => {
    const { WalletLinkConnector } = await import('@web3-react/walletlink-connector')
    return new WalletLinkConnector({
      url: rpcUrl,
      appName: 'Crosswise',
      appLogoUrl: 'https://pancakeswap.com/logo.png',
      supportedChainIds: [56, 97],
    })
  },
}

export const getLibrary = (provider): ethers.providers.Web3Provider => {
  // const biconomy = new Biconomy(provider, { apiKey: BICONOMY_API_KEY[chainId], debug: true })
  // const ethersProvider = new ethers.providers.Web3Provider(biconomy)
  // return ethersProvider
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

/**
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
export const signMessage = async (provider: any, account: string, message: string): Promise<string> => {
  if (window.BinanceChain) {
    const { signature } = await window.BinanceChain.bnbSign(account, message)
    return signature
  }

  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider?.wc) {
    const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
    const signature = await provider.provider?.wc.signPersonalMessage([wcMessage, account])
    return signature
  }

  return provider.getSigner(account).signMessage(message)
}
