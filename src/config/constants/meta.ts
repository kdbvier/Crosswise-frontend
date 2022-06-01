import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'CrossWise',
  description:
    'Crosswise takes the trading experience on DEX to the next level with tighter security, a friendly interface, cross-chain transactions, gasless swaps, verified listings and the right tools',
  image: 'https://demo2.crosswise.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Crosswise')} | ${t('Home')}`,
      }
    case '/competition':
      return {
        title: `${t('Crosswise')} | ${t('Trading Battle')}`,
      }
    case '/prediction':
      return {
        title: `${t('Crosswise')} | ${t('Prediction')}`,
      }
    case '/exchange':
      return {
        title: `${t('Crosswise')} | ${t('Exchange')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Crosswise')} | ${t('Liquidity')}`,
      }
    case '/farms':
      return {
        title: `${t('Crosswise')} | ${t('Farms')}`,
      }
    case '/pools':
      return {
        title: `${t('Crosswise')} | ${t('Pools')}`,
      }
    case '/referral':
      return {
        title: `${t('Crosswise')} | ${t('Referral')}`,
      }
    case '/lottery':
      return {
        title: `${t('Crosswise')} | ${t('Lottery')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Crosswise')} | ${t('Collectibles')}`,
      }
    case '/ifo':
      return {
        title: `${t('Crosswise')} | ${t('Initial Farm Offering')}`,
      }
    case '/teams':
      return {
        title: `${t('Crosswise')} | ${t('Leaderboard')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Crosswise')} | ${t('Task Center')}`,
      }
    case '/profile':
      return {
        title: `${t('Crosswise')} | ${t('Your Profile')}`,
      }
    default:
      return null
  }
}
