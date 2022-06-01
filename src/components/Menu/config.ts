import { MenuEntry } from '@crosswise/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Trade'),
    icon: 'TradeIcon',
    items: [
      {
        label: t('Exchange'),
        href: '/exchange',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  {
    label: 'Earn',
    icon: 'FarmIcon',
    items: [
      {
        label: t('Farms'),
        href: '/farms',
      },
      {
        label: t('Pools'),
        href: '/pools',
      },
    ],
  },
  {
    label: t('Referral'),
    icon: 'ReferralsIcon',
    href: '/referral',
  },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: 'CrossDocs',
        href: 'https://docs.crosswise.finance',
        icon: 'CrssDocsIcon',
      },
      {
        label: 'Blog',
        icon: 'MediumIcon',
        href: 'https://crosswise.medium.com',
      },
    ],
  },
]

export default config
