import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Menu as UikitMenu } from '@crosswise/uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { usePriceCrssBusd } from 'state/farms/hooks'
import { useProfile } from 'state/profile/hooks'
import config from './config'
import UserMenu from './UserMenu'
import MainAssets from './MainAssets'

const Menu = (props) => {
  const { isDark, toggleTheme } = useTheme()
  const crssPriceUsd = usePriceCrssBusd()
  const { profile } = useProfile()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { account } = useWeb3React()
  return (
    <UikitMenu
      userMenu={<UserMenu />}
      globalMenu={account && <MainAssets />}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      crssPriceUsd={crssPriceUsd.toNumber()}
      links={config(t)}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      netType="BSC"
      {...props}
    />
  )
}

export default Menu
