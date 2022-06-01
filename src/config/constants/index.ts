import { ChainId, JSBI, Percent, Token } from '@crosswise/sdk'
import { BigNumber } from '@ethersproject/bignumber'
// import { BUSD, DAI, USDT, BTCB, CRSS, WBNB, UST, ETH, USDC } from './tokens'
import { BUSD, DAI, USDT, BTCB, CRSS, WBNB, UST, ETH } from './tokens'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// export const ROUTER_ADDRESS = '0x8B6e0Aa1E9363765Ea106fa42Fc665C691443b63'
export const MAKER_ADDRESS = {
  [ChainId.TESTNET]: '0x5b435d9A8f5797eFbd59F1b7dE16DeA17f6ee456',
}
export const TAKER_ADDRESS = {
  [ChainId.TESTNET]: '0x7f7710006d7A7931f3e36979f94bb39011053827',
}
export const PANCAKE_ROUTER_ADDRESS = {
  [ChainId.MAINNET]: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  [ChainId.TESTNET]: '0x9ac64cc6e4415144c455bd8e4837fea55603e5c3',
}

// export const CRSS_TOKEN_ADDRESS = '0x99FEFBC5cA74cc740395D65D384EDD52Cb3088Bb'
export const CRSS_TOKEN_ADDRESS = {
  [ChainId.TESTNET]: '0x566a32bc7F6292628247d9a329580BFbb95926B6',
}
// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.MAINNET]: [WBNB[ChainId.MAINNET], CRSS[ChainId.MAINNET], BUSD[ChainId.MAINNET], USDT, BTCB, UST, ETH],
  [ChainId.TESTNET]: [WBNB[ChainId.TESTNET], CRSS[ChainId.TESTNET], BUSD[ChainId.TESTNET]],
}
//
/**
 * Addittional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens. ...
 * @example [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  [ChainId.MAINNET]: [WBNB[ChainId.MAINNET], CRSS[ChainId.MAINNET], BUSD[ChainId.MAINNET], USDT, BTCB, UST, ETH],
  [ChainId.TESTNET]: [WBNB[ChainId.TESTNET], CRSS[ChainId.TESTNET], BUSD[ChainId.TESTNET]],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.MAINNET]: [WBNB[ChainId.MAINNET], CRSS[ChainId.MAINNET], BUSD[ChainId.MAINNET], USDT, BTCB, UST, ETH],
  [ChainId.TESTNET]: [WBNB[ChainId.TESTNET], CRSS[ChainId.TESTNET], BUSD[ChainId.TESTNET]],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [CRSS[ChainId.MAINNET], WBNB[ChainId.MAINNET]],
    [BUSD[ChainId.MAINNET], USDT],
    [DAI, USDT],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much BNB so they end up with <.01
export const MIN_BNB: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 BNB
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
  '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C',
]

export { default as farmsConfig } from './farms'
export { default as poolsConfig } from './pools'
export { default as ifosConfig } from './ifo'

// Gelato uses this address to define a native currency in all chains
export const GELATO_NATIVE = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
// Handler string is passed to Gelato to use PCS router
export const GELATO_HANDLER = 'pancakeswap'
export const GENERIC_GAS_LIMIT_ORDER_EXECUTION = BigNumber.from(500000)
