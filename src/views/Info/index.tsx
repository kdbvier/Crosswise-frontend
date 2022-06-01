import React, { useState, useEffect } from 'react'
import { Route, useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import { TabMenu, Tab } from '@crosswise/uikit'
import { PoolUpdater, ProtocolUpdater, TokenUpdater } from 'state/info/updaters'
import { useTranslation } from 'contexts/Localization'
import InfoNav from './components/InfoNav'
import Overview from './Overview'
import Pools from './Pools'
import PoolPage from './Pools/PoolPage'
import Tokens from './Tokens'
import RedirectInvalidToken from './Tokens/redirects'
import { TabMenuWrapper } from './shared'
import Page from '../Page'

const Info: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const history = useHistory()
  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    if (location.pathname.startsWith('/info/pools')) {
      setTabIndex(1)
    } else if (location.pathname.startsWith('/info/tokens')) {
      setTabIndex(2)
    } else {
      setTabIndex(0)
    }
  }, [location, t])

  const handleTabClick = (idx: number) => {
    if (tabIndex === idx) return

    if (idx === 0) {
      history.push('/info')
      setTabIndex(0)
    } else if (idx === 1) {
      history.push('/info/pools')
      setTabIndex(1)
    } else if (idx === 2) {
      history.push('/info/tokens')
      setTabIndex(2)
    }
  }

  return (
    <Page title={t('Info & Analytics')}>
      <TabMenuWrapper>
        <TabMenu activeIndex={tabIndex} variant="primaryGradient" onItemClick={handleTabClick} fullWidth>
          <Tab>{t('Overview')}</Tab>
          <Tab>{t('Pools')}</Tab>
          <Tab>{t('Tokens')}</Tab>
        </TabMenu>
      </TabMenuWrapper>
      <ProtocolUpdater />
      {/* <PoolUpdater />
      <TokenUpdater />
      <InfoNav /> */}
      <Route path="/info" exact>
        <Overview />
      </Route>
      <Route path="/info/pools" exact>
        <Pools />
      </Route>
      <Route path="/info/tokens" exact>
        <Tokens />
      </Route>
      <Route exact path={['/info/tokens/:address', '/info/token/:address']} component={RedirectInvalidToken} />
      <Route exact path={['/info/pools/:address', '/info/pool/:address', '/info/pair/:address']} component={PoolPage} />
    </Page>
  )
}

export default Info
