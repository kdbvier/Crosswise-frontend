import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    pid: 0,
    lpSymbol: 'CRSS',
    lpAddresses: {
      97: '0x566a32bc7F6292628247d9a329580BFbb95926B6',
      56: '',
    },
    token: tokens.crss,
    quoteToken: tokens.crss,
  },
  // {
  //   sousId: 0,
  //   stakingToken: tokens.crss,
  //   earningToken: tokens.crss,
  //   contractAddress: {
  //     97: '0x76D0336D8D926d832E8158Ad8B46efC059b408d3',
  //     56: '0x70873211CB64c1D4EC027Ea63A399A7d07c4085B',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   tokenPerBlock: '10',
  //   sortOrder: 1,
  //   isFinished: false,
  // },
  // {
  //   sousId: 1,
  //   stakingToken: tokens.crss,
  //   earningToken: tokens.crss,
  //   contractAddress: {
  //     97: '0xf5d562CdD2C4e7e3c1a98B7c9DA5Bb713e31a771',
  //     56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: false,
  //   tokenPerBlock: '10',
  //   sortOrder: 1,
  //   isFinished: false,
  // },
  // {
  //   sousId: 1,
  //   stakingToken: tokens.crss,
  //   earningToken: tokens.busd,
  //   contractAddress: {
  //     97: '0xb31b99aadA093d58bf87ceA535eaCD5349039f56',
  //     56: '0xBeDb490970204cb3CC7B0fea94463BeD67d5364D',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   sortOrder: 2,
  //   tokenPerBlock: '0.0868',
  //   isFinished: false,
  // },
]

export default pools
