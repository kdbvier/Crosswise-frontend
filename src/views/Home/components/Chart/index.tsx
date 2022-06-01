// import React, { useState, useEffect } from 'react'
// import { render } from 'react-dom'
// import { AdvancedChart } from 'react-tradingview-embed'

// const Chart = React.memo((props) => {
//   return (
//     <div style={{ background: 'rgba(0, 0, 0, 0.85)', width: '1024px' }}>
//       <AdvancedChart widgetPropsAny={{ theme: 'dark', width: '100%' }} />
//     </div>
//   )
// })
// export default Chart
import React from 'react'
import {
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  // LanguageCode,
  ResolutionString,
  SeriesStyle,
  Timezone,
  widget as Widget,
} from 'charting_library/charting_library'
import { getHistoricalData, getAllTransactions, makeApiDurationRequest, getTokenInfo } from './helpers'

export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions['symbol']
  interval: ChartingLibraryWidgetOptions['interval']
  // BEWARE: no trailing slash is expected in feed URL
  datafeedUrl: string
  libraryPath: ChartingLibraryWidgetOptions['library_path']
  chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']
  chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version']
  clientId: ChartingLibraryWidgetOptions['client_id']
  userId: ChartingLibraryWidgetOptions['user_id']
  fullscreen: ChartingLibraryWidgetOptions['fullscreen']
  autosize: ChartingLibraryWidgetOptions['autosize']
  studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides']
  container: ChartingLibraryWidgetOptions['container']
  height: number
  tokenAddress: string
  priceScale: number
  routerVersion: string
  chainId: number
}

const ChartContainerProps = {
  symbol: 'AAPL',
  interval: '15' as ResolutionString,
  container: 'tv_chart_container',
  datafeedUrl: 'https://demo_feed.tradingview.com',
  libraryPath: '/charting_library/',
  chartsStorageUrl: 'https://saveload.tradingview.com',
  chartsStorageApiVersion: '1.1',
  clientId: 'tradingview.com',
  userId: 'public_user_id',
  fullscreen: false,
  autosize: true,
  studiesOverrides: {},
  height: 600,
}

// let currentResolutions: any
const quoteCurrency = {
  symbol: 'BNB',
  address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  pair: '0xb5d85cA38a9CbE63156a02650884D92A6e736DDC',
  exchangeName: 'Crss',
}
const Chart: React.FC<Partial<ChartContainerProps>> = () => {
  const input = '0x99FEFBC5cA74cc740395D65D384EDD52Cb3088Bb'
  // const input = '0xe64972C311840cFaf2267DCfD365571F9D9544d9'
  const chainId = 56
  const routerVersion = 'crss'

  const symbolRef = React.useRef(null)
  let lastBarsCache: any

  const configurationData = {
    supports_marks: true,
    supports_timescale_marks: true,
    supported_resolutions: ['1', '5', '10', '15', '30', '1H', '1D', '1W', '1M'],
    exchanges: [
      {
        value: 'Bitfinex',
        name: 'Bitfinex',
        desc: 'Bitfinex',
      },
      // Bitfinex
    ],
  }

  const [tokendetails, setTokenDetails] = React.useState({
    name: 'Crss Token',
    pair: 'CRSS/BNB',
    symbol: 'CRSS',
    version: 'CRSS DEX',
  })
  // const loadingChartData = React.useMemo(() => {
  //   return !quoteCurrency.address
  // }, [quoteCurrency])
  async function getAllSymbols() {
    const allSymbols: any = []
    return allSymbols
  }

  const feed = {
    onReady: (callback: any) => {
      setTimeout(() => callback(configurationData), 0)
    },
    searchSymbols: async (userInput: any, exchange: any, symbolType: any, onResultReadyCallback: any) => {
      const symbols = await getAllSymbols()
      const newSymbols = symbols.filter((symbol) => {
        const isExchangeValid = exchange === '' || symbol.exchange === exchange
        const isFullSymbolContainsInput = symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1
        return isExchangeValid && isFullSymbolContainsInput
      })
      onResultReadyCallback(newSymbols)
    },
    resolveSymbol: async (symbolName: any, onSymbolResolvedCallback: any, onResolveErrorCallback: any) => {
      // const quoteSymbol = chainId === ChainId.ETHEREUM  ? 'ETH' : 'BNB'
      const { symbol: quoteSymbol, exchangeName } = quoteCurrency
      symbolRef.current = onSymbolResolvedCallback
      getTokenInfo(input, quoteCurrency, routerVersion, chainId).then((tokenInfo) => {
        const res = {
          name: tokenInfo.name,
          pair: `${tokenInfo.symbol}/${quoteSymbol}`,
          symbol: tokenInfo.symbol,
          version: exchangeName,
        }
        setTokenDetails(res)
        const symbolInfo = {
          ticker: res.pair,
          name: res.pair,
          description: res.symbol,
          type: 'crypto',
          session: '24x7',
          timezone: 'Etc/UTC',
          exchange: exchangeName,
          minmov: 1,
          pricescale: tokenInfo.priceScale,
          has_intraday: true,
          has_no_volume: false,
          has_weekly_and_monthly: false,
          supported_resolutions: configurationData.supported_resolutions,
          volume_precision: 2,
          data_status: 'streaming',
        }
        onSymbolResolvedCallback(symbolInfo)
      })
    },
    getBars: async (
      symbolInfo: any,
      resolution: any,
      periodParams: any,
      onHistoryCallback: any,
      onErrorCallback: any,
    ) => {
      localStorage.setItem('chart_interval', resolution)
      const { to, countBack, firstDataRequest } = periodParams
      try {
        // if (result) {
        if (!firstDataRequest) {
          const data1 = await makeApiDurationRequest(
            input,
            routerVersion,
            resolution,
            new Date(to * 1000).toISOString(),
            countBack,
            chainId,
          )
          const noDataFlag = data1.length === 0
          // "noData" should be set if there is no data in the requested period.
          onHistoryCallback(data1, {
            noData: noDataFlag,
          })
          return
        }
        // }
        const data = await getHistoricalData(input, quoteCurrency, routerVersion, resolution, chainId)
        const bars = data.map((bar: any, i: any) => {
          return {
            ...bar,
            isBarClosed: true,
            isLastBar: false,
          }
        })

        bars[bars.length - 1].isBarClosed = false
        bars[bars.length - 1].isLastBar = true
        // lastBarsCache = bars[bars.length - 1]
        // eslint-disable-next-line no-console
        onHistoryCallback(bars, {
          noData: false,
        })
      } catch (error) {
        onErrorCallback(error)
      }
    },
    getMarks: async (symbolInfo: any, startDate: any, endDate: any, onDataCallback: any, resolution: any) => {
      // try {
      //   const data = await getAllTransactions(account, input, chainId)
      //   const sessionData = JSON.parse(sessionStorage.getItem(storages.SESSION_LIVE_PRICE))
      //   let bars: any = []
      //   data.forEach((bar: any, i: any) => {
      //     let labelText: any
      //     let label: any
      //     let amount: any
      //     let color: any
      //     const date = new Date(bar.time * 1000).toLocaleString()
      //     if (bar.buyCurrency === symbolInfo.description) {
      //       labelText = 'Sell'
      //       label = 'S'
      //       amount = bar.buyAmount
      //       color = 'red'
      //     } else {
      //       labelText = 'Buy'
      //       label = 'B'
      //       amount = bar.sellAmount
      //       color = 'green'
      //     }
      //     const price = bar.tradeAmount
      //     const curValue = amount * sessionData.price
      //     const html = `
      //       <div>
      //         <br>${labelText} at ${date}</br>
      //         <br>Amount: ${amount.toFixed(4)}</br>
      //         <br>Price: $${price.toFixed(2)}</br>
      //         <br>Current value: $${curValue.toFixed(2)}</br>
      //       </div>
      //     `
      //     const obj: any = {
      //       id: i,
      //       time: bar.time,
      //       color,
      //       text: html,
      //       label,
      //       labelFontColor: '#444444',
      //       minSize: 5,
      //     }
      //     bars = [...bars, obj]
      //   })
      //   onDataCallback(bars)
      // } catch (error) {
      //   console.error(error)
      // }
    },
    getTimescaleMarks: async (symbolInfo: any, startDate: any, endDate: any, onDataCallback: any, resolution: any) => {
      // try {
      //   const data = await getAllTransactions(account, input)
      //   const sessionData = JSON.parse(sessionStorage.getItem(storages.SESSION_LIVE_PRICE))
      //   let bars: any = []
      //   data.forEach((bar: any, i: any) => {
      //     let labelText: any
      //     let label: any
      //     let amount: any
      //     let price: any
      //     let curValue: any
      //     let color: any
      //     let date = new Date(bar.time * 1000).toLocaleString()
      //     if (bar.buyCurrency === symbolInfo.description) {
      //       labelText = 'Sell'
      //       label = 'Sell'
      //       amount = bar.buyAmount
      //       color = 'red'
      //     } else {
      //       labelText = 'Buy'
      //       label = 'Buy'
      //       amount = bar.sellAmount
      //       color = 'green'
      //     }
      //     price = bar.tradeAmount
      //     curValue = amount * sessionData.price
      //     const html = `
      //       <div>
      //         <br>${labelText} at ${date}</br>
      //         <br>Amount: ${amount.toFixed(4)}</br>
      //         <br>Price: $${price.toFixed(2)}</br>
      //         <br>Current value: $${curValue.toFixed(2)}</br>
      //       </div>
      //     `
      //     const obj: any = {
      //       id: i,
      //       time: bar.time,
      //       color: color,
      //       label: label,
      //       tooltip: html,
      //     }
      //     bars = [...bars, obj]
      //   })
      //   onDataCallback(bars)
      // } catch (error) {
      //   console.error(error)
      // }
    },
    subscribeBars: (
      symbolInfo: any,
      resolution: any,
      onRealtimeCallback: any,
      subscribeUID: any,
      onResetCacheNeededCallback: any,
    ) => {
      // currentResolutions = resolution
      // setInterval(async function () {
      //   const resolutionMapping: any = {
      //     '1': 60000,
      //     '5': 300000,
      //     '10': 600000,
      //     '15': 900000,
      //     '30': 1800000,
      //     '60': 3600000,
      //     '1H': 3600000,
      //     '1D': 24 * 3600000,
      //     '1W': 7 * 24 * 3600000,
      //     '1M': 30 * 24 * 3600000,
      //   }
      //   let sessionData = JSON.parse(sessionStorage.getItem(storages.SESSION_LIVE_PRICE))
      //   let latestTime = Number(sessionStorage.getItem(storages.SESSION_LATEST_TIME))
      //   let volume = Number(sessionStorage.getItem(storages.SESSION_LIVE_VOLUME))
      //   if (lastBarsCache === undefined) return
      //   if (sessionData === null) return
      //   const isNew = new Date().getTime() - Number(lastBarsCache.time) >= resolutionMapping[currentResolutions]
      //   if (isNew) {
      //     lastBarsCache.time = new Date().getTime()
      //     lastBarsCache.open = lastBarsCache.close
      //     lastBarsCache.high = lastBarsCache.close
      //     lastBarsCache.low = lastBarsCache.close
      //     volume = 0
      //   } else {
      //     if (Number(lastBarsCache.low) > Number(lastBarsCache.close)) {
      //       lastBarsCache.low = lastBarsCache.close
      //     }
      //     if (Number(lastBarsCache.high) < Number(lastBarsCache.close)) {
      //       lastBarsCache.high = lastBarsCache.close
      //     }
      //     if (latestTime < Number(sessionData.timestamp)) {
      //       volume = volume + Number(sessionData.amount)
      //       latestTime = Number(sessionData.timestamp)
      //       sessionStorage.setItem(storages.SESSION_LATEST_TIME, latestTime.toString())
      //     }
      //   }
      //   lastBarsCache.close = sessionData.price
      //   lastBarsCache.volume = volume
      //   sessionStorage.setItem(storages.SESSION_LIVE_VOLUME, volume.toString())
      //   onRealtimeCallback(lastBarsCache)
      // }, 1000 * 2) // 2s update interval
    },
    unsubscribeBars: (subscriberUID) => {
      console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID)
      console.log('[unsubscribeBars]: cleared')
    },
  }
  const getWidget = async () => {
    const localTimezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
    const customTimezone: Timezone = localTimezone as Timezone
    let tvWidget: IChartingLibraryWidget | null = null
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: tokendetails.pair,
      datafeed: feed,
      interval: ChartContainerProps.interval as ChartingLibraryWidgetOptions['interval'],
      library_path: ChartContainerProps.libraryPath as string,
      container: ChartContainerProps.container as ChartingLibraryWidgetOptions['container'],
      locale: 'en',
      theme: 'Dark',
      enabled_features: ['study_templates'],
      charts_storage_url: ChartContainerProps.chartsStorageUrl,
      client_id: ChartContainerProps.clientId,
      user_id: ChartContainerProps.userId,
      fullscreen: ChartContainerProps.fullscreen,
      autosize: ChartContainerProps.autosize,
      studies_overrides: ChartContainerProps.studiesOverrides,
      timezone: customTimezone,
      overrides: {
        'mainSeriesProperties.style': Number(2),
      },
    }

    tvWidget = await new Widget(widgetOptions)
    return tvWidget
  }

  React.useEffect(() => {
    const { symbol: quoteSymbol } = quoteCurrency
    if (!quoteSymbol) return

    getWidget().then((widget) => {
      widget.onChartReady(() => {
        widget
          .activeChart()
          .onChartTypeChanged()
          .subscribe(null, (chartType: SeriesStyle) => {
            // dispatch(setCustomChartType({ customChartType: chartType }))
          })
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div id={ChartContainerProps.container} style={{ height: '600px', width: '100%', paddingBottom: '10px' }} />
    </>
  )
}

export default React.memo(Chart)
