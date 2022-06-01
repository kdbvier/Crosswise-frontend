import { getChartData, getMarksData, getChartDurationData, getTokenInfoForChart } from 'utils/apiServices'

export async function getTokenInfo(path: any, quoteCurrency: any, routerVersion: any, chainId = 56) {
  try {
    const { address, pair } = quoteCurrency
    if (routerVersion === 'crss') {
      const data: any = await getTokenInfoForChart(path, address, pair, routerVersion, chainId)
      return data
    }
    const data: any = await getTokenInfoForChart(path, address, '', routerVersion, chainId)
    return data
  } catch (error) {
    return []
  }
}
export async function makeApiDurationRequest(
  path: any,
  quoteCurrency: any,
  routerVersion: any,
  resolution: any,
  to: any,
  countBack: any,
  chainId = 56,
) {
  try {
    const { address, pair } = quoteCurrency
    if (chainId === 1) {
      const data: any = await getChartDurationData(path, address, pair, resolution, to, countBack, chainId)
      return data
    }
    const data: any = await getChartDurationData(path, address, pair, resolution, to, countBack, chainId)
    return data
  } catch (error) {
    return []
  }
}
export function generateSymbol(exchange: any, fromSymbol: any, toSymbol: any) {
  const short = `${fromSymbol}/${toSymbol}`
  return {
    short,
    full: `${exchange}:${short}`,
  }
}

export function parseFullSymbol(fullSymbol: any) {
  const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/)
  if (!match) {
    return null
  }
  return {
    exchange: match[1],
    fromSymbol: match[2],
    toSymbol: match[3],
  }
}

// export async function getAllTransactions(account: any, path: any, chainId = 56) {
export async function getAllTransactions(account: any, path: any) {
  try {
    const data: any = await getMarksData(account, path)
    return data
  } catch (error) {
    return []
  }
}
export async function getHistoricalData(
  path: any,
  quoteCurrency: any,
  routerVersion: any,
  resolution: any,
  chainId = 56,
) {
  try {
    const { address, pair } = quoteCurrency
    if (chainId === 1) {
      const data: any = await getChartData(path, address, pair, resolution, routerVersion, chainId)
      return data
    }
    const data: any = await getChartData(path, address, pair, resolution, routerVersion)
    return data
  } catch (error) {
    return []
  }
}
