import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import {
  Flex,
  Box,
  Input,
  Text,
  Heading,
  Card,
  Skeleton,
  Dropdown,
  DropdownItem,
  useMatchBreakpoints,
} from '@crosswise/uikit'
import { format, fromUnixTime } from 'date-fns'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/Layout/Page'
import LineChart from 'views/Info/components/InfoCharts/LineChart'
import TokenTable from 'views/Info/components/InfoTables/TokensTable'
import PoolTable from 'views/Info/components/InfoTables/PoolsTable'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import BarChart from 'views/Info/components/InfoCharts/BarChart'
import {
  useAllPoolData,
  useAllTokenData,
  useProtocolChartData,
  useProtocolData,
  useProtocolTransactions,
} from 'state/info/hooks'
import TransactionTable from 'views/Info/components/InfoTables/TransactionsTable'
import { StyledCard, CardHeader, CardBody } from '../shared'
import TokenCard from '../components/TokenCard'

export const ChartCardsContainer = styled(Flex)`
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: 0;
  gap: 1em;

  & > * {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
  } ;
`

const Overview: React.FC = () => {
  const { t } = useTranslation()
  const { isSm, isMd } = useMatchBreakpoints()
  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [liquidityDateHover, setLiquidityDateHover] = useState<string | undefined>()
  const [volumeHover, setVolumeHover] = useState<number | undefined>()
  const [volumeDateHover, setVolumeDateHover] = useState<string | undefined>()

  const [protocolData] = useProtocolData()
  const [chartData] = useProtocolChartData()
  const [transactions] = useProtocolTransactions()

  const currentDate = format(new Date(), 'MMM d, yyyy')

  const viewOpt = [
    {
      label: t('Top Tokens'),
      value: 'token',
    },
    {
      label: t('Top Pools'),
      value: 'pool',
    },
  ]

  const [searchValue, setSearchValue] = useState('')
  const [currentView, setCurrentView] = useState<DropdownItem>(viewOpt[0])

  // Getting latest liquidity and volumeUSD to display on top of chart when not hovered
  useEffect(() => {
    if (volumeHover == null && protocolData) {
      setVolumeHover(protocolData.volumeUSD)
    }
  }, [protocolData, volumeHover])
  useEffect(() => {
    if (liquidityHover == null && protocolData) {
      setLiquidityHover(protocolData.liquidityUSD)
    }
  }, [liquidityHover, protocolData])

  const formattedLiquidityData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: fromUnixTime(day.date),
          value: day.liquidityUSD,
        }
      })
    }
    return []
  }, [chartData])

  const formattedVolumeData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: fromUnixTime(day.date),
          value: day.volumeUSD,
        }
      })
    }
    return []
  }, [chartData])

  const allTokens = useAllTokenData()
  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((token) => token.data)
      .filter(
        (token) => token && (searchValue.length === 0 || token.name.toLowerCase().includes(searchValue.toLowerCase())),
      )
  }, [allTokens, searchValue])

  const allPoolData = useAllPoolData()
  const poolDatas = useMemo(() => {
    return Object.values(allPoolData)
      .map((pool) => pool.data)
      .filter(
        (pool) =>
          pool &&
          (searchValue.length === 0 ||
            `${pool.token0.name}/${pool.token1.name}`.toLowerCase().includes(searchValue.toLowerCase())),
      )
  }, [allPoolData, searchValue])

  const somePoolsAreLoading = useMemo(() => {
    return Object.values(allPoolData).some((pool) => !pool.data)
  }, [allPoolData])

  return (
    <>
      <ChartCardsContainer>
        <Card>
          <Box p={['16px', '16px', '24px']}>
            <Text bold>{t('Liquidity')}</Text>
            {liquidityHover > 0 ? (
              <Text gradient="gradprimary" bold fontSize="24px">
                ${formatAmount(liquidityHover)}
              </Text>
            ) : (
              <Skeleton width="128px" height="36px" />
            )}
            <Text>{liquidityDateHover ?? currentDate}</Text>
            <Box height="250px">
              <LineChart
                data={formattedLiquidityData}
                setHoverValue={setLiquidityHover}
                setHoverDate={setLiquidityDateHover}
              />
            </Box>
          </Box>
        </Card>
        <Card>
          <Box p={['16px', '16px', '24px']}>
            <Text bold>{t('Volume 24H')}</Text>
            {volumeHover > 0 ? (
              <Text gradient="gradprimary" bold fontSize="24px">
                ${formatAmount(volumeHover)}
              </Text>
            ) : (
              <Skeleton width="128px" height="36px" />
            )}
            <Text>{volumeDateHover ?? currentDate}</Text>
            <Box height="250px">
              <LineChart data={formattedVolumeData} setHoverValue={setVolumeHover} setHoverDate={setVolumeDateHover} />
            </Box>
          </Box>
        </Card>
      </ChartCardsContainer>
      {/* <Heading scale="lg" mt="40px" mb="16px">
        {t('Top Tokens')}
      </Heading> */}
      <Box mt="32px">
        <TokenCard />
      </Box>

      <StyledCard mt="32px">
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
          {currentView.value === 'token' ? (
            <TokenTable tokenDatas={formattedTokens} />
          ) : (
            <PoolTable poolDatas={poolDatas} loading={somePoolsAreLoading} />
          )}
        </CardBody>
      </StyledCard>
      {/* <Heading scale="lg" mt="40px" mb="16px">
        {t('Top Pools')}
      </Heading>
      <PoolTable poolDatas={poolDatas} loading={somePoolsAreLoading} /> */}
      {/* <Heading scale="lg" mt="40px" mb="16px">
        {t('Transactions')}
      </Heading> */}
      <Box mt="32px">
        <TransactionTable transactions={transactions} />
      </Box>
    </>
  )
}

export default Overview
