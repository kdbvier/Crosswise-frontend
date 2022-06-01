import React, { useCallback, useEffect, useMemo, useState, lazy } from 'react'
import { Input, Box, Flex, Text, Dropdown, DropdownItem, useMatchBreakpoints } from '@crosswise/uikit'
import { formatNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import { useAllTokenData, useTokenDatas, useProtocolData } from 'state/info/hooks'
import { useWatchlistTokens } from 'state/user/hooks'
import { TokenData } from 'state/info/types'
import { StyledCard } from '../shared'
import { CardHeader, CardBody } from './styled'
import TokenTable from './TokensTable'

export default function CoinPriceCard() {
  const { t } = useTranslation()
  const { isSm, isMd } = useMatchBreakpoints()

  const viewOpt = [
    {
      label: t('Top Gainers'),
      value: 'gainer',
    },
    {
      label: t('Top Losers'),
      value: 'loser',
    },
    {
      label: t('Featured'),
      value: 'featured',
    },
  ]

  const [searchValue, setSearchValue] = useState('')
  const [currentView, setCurrentView] = useState<DropdownItem>(viewOpt[0])

  const [savedTokens] = useWatchlistTokens()
  const watchListTokens = useTokenDatas(savedTokens)

  // const allTokens = useAllTokenData()

  // for test

  const formattedTokens = useMemo(() => {
    const allTokens: { [address: string]: { data?: TokenData } } = {
      BNB: {
        data: {
          exists: true,
          name: 'BNB',
          symbol: 'BNB',
          address: 'BNB',

          volumeUSD: 123456,
          volumeUSDChange: 3.6,
          volumeUSDWeek: 1.4,
          txCount: 101,

          liquidityToken: 10,
          liquidityUSD: 1000,
          liquidityUSDChange: 0.5,

          priceUSD: 300,
          priceUSDChange: 1.3,
          priceUSDChangeWeek: 3.6,
        },
      },
      Arbitrum: {
        data: {
          exists: true,
          name: 'Arbitrum',
          symbol: 'Arbitrum',
          address: 'Arbitrum',

          volumeUSD: 123456,
          volumeUSDChange: 3.6,
          volumeUSDWeek: 1.4,
          txCount: 101,

          liquidityToken: 10,
          liquidityUSD: 1000,
          liquidityUSDChange: 0.5,

          priceUSD: 300,
          priceUSDChange: 1.3,
          priceUSDChangeWeek: 3.6,
        },
      },
      Ethereum: {
        data: {
          exists: true,
          name: 'Ethereum',
          symbol: 'Ethereum',
          address: 'Ethereum',

          volumeUSD: 123456,
          volumeUSDChange: 3.6,
          volumeUSDWeek: 1.4,
          txCount: 101,

          liquidityToken: 10,
          liquidityUSD: 1000,
          liquidityUSDChange: 0.5,

          priceUSD: 300,
          priceUSDChange: 1.3,
          priceUSDChangeWeek: 3.6,
        },
      },
      Optimism: {
        data: {
          exists: true,
          name: 'Optimism',
          symbol: 'Optimism',
          address: 'Optimism',

          volumeUSD: 123456,
          volumeUSDChange: 3.6,
          volumeUSDWeek: 1.4,
          txCount: 101,

          liquidityToken: 10,
          liquidityUSD: 1000,
          liquidityUSDChange: 0.5,

          priceUSD: 300,
          priceUSDChange: 1.3,
          priceUSDChangeWeek: 3.6,
        },
      },
    }
    return Object.values(allTokens)
      .map((token) => token.data)
      .filter((token) => token && token.name.toLowerCase().includes(searchValue.toLowerCase()))
  }, [searchValue])

  return (
    <StyledCard>
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center" flexWrap={isSm ? 'wrap' : 'nowrap'}>
          <Text
            fontSize="16px"
            fontWeight="700"
            marginRight="20px"
            width={isSm ? '100%' : ''}
            marginBottom={isSm ? '10px' : ''}
          >
            {currentView.label}
          </Text>
          <Box width={isSm ? 'calc(100% - 130px)' : '100%'} maxWidth="680px">
            <Input
              type="search"
              scale="lg"
              placeholder="Search"
              mx="auto"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Box>
          <Box marginLeft="20px">
            <Dropdown list={viewOpt} current={currentView} placement="bottom" onClickItem={setCurrentView} />
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        <TokenTable tokenDatas={formattedTokens} />
      </CardBody>
    </StyledCard>
  )
}
