import { getCrossPairContract, getChainLinkContract } from 'utils/contractHelpers'
import { usefulTestTokens } from 'config/constants/chainLinkTokens'
import { BIG_TEN } from 'utils/bigNumber'
import { getCrssAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

const getLpPriceInUsd = async (farm: any, crssPriceBusd: any) => {
  let price = new BigNumber(0)
  const crossPairContract = getCrossPairContract(farm.lpAddresses[97])
  const chainLinkContract = getChainLinkContract()
  const { _reserve0, _reserve1 } = await crossPairContract.getReserves()
  const reserve0 = new BigNumber(_reserve0._hex)
  const reserve1 = new BigNumber(_reserve1._hex)
  const tokenAddress = farm.token.address[97]
  const quoteTokenAddress = farm.quoteToken.address[97]
  if (tokenAddress === getCrssAddress()) {
    price = price.plus(reserve0.multipliedBy(crssPriceBusd).multipliedBy(BIG_TEN.pow(8)))
  } else {
    const reserve0InUsd = usefulTestTokens.includes(tokenAddress)
      ? await chainLinkContract.getTokenPrice(tokenAddress)
      : await chainLinkContract.getTokenPrice('0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee')
    const reserve0InBigNumber = new BigNumber(reserve0InUsd._hex)
    price = price.plus(reserve0.multipliedBy(reserve0InBigNumber))
  }

  const reserve1InUsd = usefulTestTokens.includes(quoteTokenAddress)
    ? await chainLinkContract.getTokenPrice(quoteTokenAddress)
    : await chainLinkContract.getTokenPrice('0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee')
  const reserve1InBigNumber = new BigNumber(reserve1InUsd._hex)
  price = price.plus(reserve1.multipliedBy(reserve1InBigNumber))
  return price.div(BIG_TEN.pow(26)).toNumber()
}

export default getLpPriceInUsd
