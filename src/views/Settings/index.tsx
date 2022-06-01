import React from 'react'
import { useLocation } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { Heading, Text, Button, Input, Checkbox } from '@crosswise/uikit'
import { useFarms } from 'state/farms/hooks'
import { useTranslation } from 'contexts/Localization'
import { useThemeManager } from 'state/user/hooks'
import { SettingsHeader, SettingHeaderLayout, SettingsHeadCard, HeaderTopBar, Planet2 } from './styled'

const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number) => {
  if (cakeRewardsApr && lpRewardsApr) {
    return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (cakeRewardsApr) {
    return cakeRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}

const Settings: React.FC = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()

  const { account } = useWeb3React()

  const [isDark] = useThemeManager()

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const showAddress = (param: any): string => {
    if (!param) {
      return ''
    }
    const temp = param.substr(0, 29)
    return temp.concat('...')
  }

  return (
    <>
      <SettingsHeader>
        <HeaderTopBar>
          <Heading as="h1" scale="xl" color="text" mb="32px">
            {t('Personal Account area')}
          </Heading>
        </HeaderTopBar>
      </SettingsHeader>

      <SettingHeaderLayout>
        <SettingsHeadCard isDarkTheme={isDark}>
          <Text fontSize="20px" color="text">
            Wallet Settings
          </Text>
          <div style={{ marginTop: '45px' }}>
            <Text fontSize="13px" color="textSecondary">
              Wallet address
            </Text>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <Text fontSize="16px" color="textSecondary">
                {showAddress(account)}
              </Text>
              {account && (
                <div style={{ color: '#16b8b8', fontSize: '16px', paddingLeft: '20px', cursor: 'pointer' }}>Copy</div>
              )}
            </div>
          </div>
        </SettingsHeadCard>
        <Planet2>
          <img src="/images/planet/p4.png" alt="planet1" />
        </Planet2>
      </SettingHeaderLayout>

      <SettingHeaderLayout>
        <SettingsHeadCard isDarkTheme={isDark}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Left block start */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
              <Text fontSize="20px" color="text">
                Wallet Settings
              </Text>
              <div>
                <Text color="textSecondary" fontSize="13px">
                  Username:
                </Text>
                <Input type="text" placeholder="" scale="md" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '24px', paddingBottom: '24px' }}>
                <Checkbox scale="sm" />
                <Text paddingLeft="16px" fontSize="14px" color="textSecondary">
                  Set email address for notifications
                </Text>
              </div>

              <div>
                <Input type="text" placeholder="User email:" scale="md" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '24px', paddingBottom: '24px' }}>
                <Checkbox scale="sm" checked />
                <Text paddingLeft="16px" fontSize="14px" color="textSecondary">
                  Set Telegram nickname for notifications
                </Text>
              </div>

              <div>
                <Input type="text" placeholder="Telegram nickname:" scale="md" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '24px', paddingBottom: '24px' }}>
                <Checkbox scale="sm" checked />
                <Text paddingLeft="16px" fontSize="14px" color="textSecondary">
                  Get Notifications
                </Text>
              </div>
            </div>
            {/* Left block end */}

            {/* Right block start */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
              <Text fontSize="20px" color="text">
                DEX Settings
              </Text>
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '24px' }}>
                <Checkbox scale="sm" />
                <Text paddingLeft="16px" fontSize="14px" color="textSecondary">
                  Gassless mode
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '24px' }}>
                <Checkbox scale="sm" checked />
                <Text paddingLeft="16px" fontSize="14px" color="textSecondary">
                  Auto Vesting (burn 50% XCRSS and get it directly as CRSS
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '24px' }}>
                <Checkbox scale="sm" checked />
                <Text paddingLeft="16px" fontSize="14px" color="textSecondary">
                  Auto Compaund (5% performance fee)
                </Text>
              </div>
            </div>
            {/* Right block end */}
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primaryGradient">Save</Button>
          </div>
        </SettingsHeadCard>
      </SettingHeaderLayout>
    </>
  )
}

export default Settings
