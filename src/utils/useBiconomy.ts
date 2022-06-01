import Web3 from 'web3'
import { Biconomy } from '@biconomy/mexa'
import { simpleRpcProvider } from './providers'

const bscProvider = new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545")
const biconomy = new Biconomy(bscProvider, {
  walletProvider: window.ethereum,
  apiKey: 'xK_YKnfJFP.b35690b9-2b5f-41c3-b7b6-b3716d3b400e',
  debug: true,
})
export const sendTransactionByBiconomy = async (
  contractAddress: string,
  abi: any,
  account: string,
  func: string,
  params: any,
) => {

  const biconomyWeb3 = new Web3(biconomy)
      const biconomyContract = new biconomyWeb3.eth.Contract(abi, contractAddress)
      console.log('biconomyContract: ', params, account)
      const tx = await biconomyContract.methods[func](...params).send({
        from: account,
        signatureType: biconomy.EIP712_SIGN,
      })
      console.log('transaction: ', tx)
      tx.on('transactionHash', function (hash) {
        console.log('transactionHash: ', hash)
      }).once('confirmation', function (confirmationNumber, receipt) {
        console.log('receipt: ', receipt)
        return receipt
      })

}
