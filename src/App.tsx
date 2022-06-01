import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ResetCSS } from '@crosswise/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { Biconomy } from '@biconomy/mexa'
import useEagerConnect from 'hooks/useEagerConnect'
import { usePollBlockNumber } from 'state/block/hooks'
import { usePollCoreFarmData } from 'state/farms/hooks'
import { usePollCorePoolData } from 'state/pools/hooks'
import { useFetchProfile } from 'state/profile/hooks'
import { fetchUserInfo, fetchTransacInfo } from 'state/personalAccount/hooks'
import { DatePickerPortal } from 'components/DatePicker'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import EasterEgg from './components/EasterEgg'
import BackgroundEffects from './components/BackgroundEffects'
import history from './routerHistory'
import Pools from './views/Pools'
import 'swiper/swiper.min.css'

const bscProvider = new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545')
const biconomy = new Biconomy(bscProvider, {
  walletProvider: window.ethereum,
  apiKey: 'xK_YKnfJFP.b35690b9-2b5f-41c3-b7b6-b3716d3b400e',
  debug: true,
})
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Trade = lazy(() => import('./views/Trade'))
const OrderBookOld = lazy(() => import('./views/OrderBook(Old)')) // Should be removed in the future
const OrderBook = lazy(() => import('./views/OrderBook'))
const Referral = lazy(() => import('./views/Referral'))
const Account = lazy(() => import('./views/PersonalAccount'))
const Info = lazy(() => import('./views/Info'))
const NotFound = lazy(() => import('./views/NotFound'))
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { active, account } = useWeb3React()
  const dispatch = useDispatch()
  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  usePollCorePoolData()
  React.useEffect(() => {
    if (active) {
      dispatch(fetchUserInfo(account))
      dispatch(fetchTransacInfo(account))
    }
  }, [active, account, dispatch])
  React.useEffect(() => {
    biconomy
      .onEvent(biconomy.READY, () => {
        // Initialize your dapp here like getting user accounts etc
        console.log('biconomyReady')
      })
      .onEvent(biconomy.ERROR, (error, message) => {
        // Handle error while initializing mexa
        console.log('biconomyError: ', error, message)
      })
  }, [])
  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <BackgroundEffects starCounts={2} />
          <Switch>
            <Route path="/pool">
              <Redirect to="/liquidity" />
            </Route>
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/info">
              <Info />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/pools">
              <Pools />
            </Route>
            <Route exact path="/referral">
              <Referral />
            </Route>
            <Route path="/exchange">
              <Trade />
            </Route>
            <Route path="/send">
              <Trade />
            </Route>
            <Route path="/limit-orders">
              <OrderBook />
            </Route>
            <Route path="/limitorders">
              <OrderBookOld />
            </Route>
            <Route path="/liquidity">
              <Trade />
            </Route>
            <Route path="/create">
              <Trade />
            </Route>
            <Route path="/personal-account">
              <Account />
            </Route>
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
      <DatePickerPortal />
    </Router>
  )
}

export default React.memo(App)
