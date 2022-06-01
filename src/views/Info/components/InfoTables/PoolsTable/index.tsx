import React, { useCallback, useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Text, Flex, Box, Skeleton, ExpandableButton } from '@crosswise/uikit'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import { PoolData } from 'state/info/types'
import { ITEMS_PER_INFO_TABLE_PAGE } from 'config/constants/info'
import { DoubleCurrencyLogo } from 'views/Info/components/CurrencyLogo'
import SaveIcon from 'views/Info/components/SaveIcon'
import { useTranslation } from 'contexts/Localization'
import { useWatchlistPools } from 'state/user/hooks'
import { ClickableColumnHeader, InnerTableWrapper, PageButtons, Arrow, Break } from '../shared'
import { ResponsiveGrid, LinkWrapper } from './styled'

const SORT_FIELD = {
  volumeUSD: 'volumeUSD',
  tvlUSD: 'tvlUSD',
  volumeUSDWeek: 'volumeUSDWeek',
  lpFees24h: 'lpFees24h',
  lpApr7d: 'lpApr7d',
}

const LoadingRow: React.FC = () => (
  <ResponsiveGrid>
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </ResponsiveGrid>
)

const TableLoader: React.FC = () => (
  <>
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
  </>
)

const DataRow = ({ poolData, index }: { poolData: PoolData; index: number }) => {
  const [watchlistPools, addPoolToWatchlist] = useWatchlistPools()

  return (
    <LinkWrapper to={`/info/pool/${poolData.address}`}>
      <ResponsiveGrid>
        <Flex>
          <Text mr="8px">{index + 1}</Text>
          <SaveIcon
            fill={watchlistPools.includes(poolData.address)}
            onClick={() => addPoolToWatchlist(poolData.address)}
          />
        </Flex>
        <Flex>
          <DoubleCurrencyLogo address0={poolData.token0.address} address1={poolData.token1.address} />
          <Text ml="8px">
            {poolData.token0.symbol}/{poolData.token1.symbol}
          </Text>
        </Flex>
        <Text>${formatAmount(poolData.volumeUSD)}</Text>
        <Text>${formatAmount(poolData.volumeUSDWeek)}</Text>
        <Text>${formatAmount(poolData.lpFees24h)}</Text>
        <Text>{formatAmount(poolData.lpApr7d)}%</Text>
        <Text>${formatAmount(poolData.liquidityUSD)}</Text>
      </ResponsiveGrid>
    </LinkWrapper>
  )
}

interface PoolTableProps {
  poolDatas: PoolData[]
  loading?: boolean // If true shows indication that SOME pools are loading, but the ones already fetched will be shown
}

const PoolTable: React.FC<PoolTableProps> = ({ poolDatas, loading }) => {
  // for sorting
  const [sortField, setSortField] = useState(SORT_FIELD.volumeUSD)
  const [sortDirection, setSortDirection] = useState<boolean>(true)
  const { t } = useTranslation()

  // pagination
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  useEffect(() => {
    let extraPages = 1
    if (poolDatas.length % ITEMS_PER_INFO_TABLE_PAGE === 0) {
      extraPages = 0
    }
    setMaxPage(Math.floor(poolDatas.length / ITEMS_PER_INFO_TABLE_PAGE) + extraPages)
  }, [poolDatas])

  const sortedPools = useMemo(() => {
    return poolDatas
      ? poolDatas
          .sort((a, b) => {
            if (a && b) {
              return a[sortField as keyof PoolData] > b[sortField as keyof PoolData]
                ? (sortDirection ? -1 : 1) * 1
                : (sortDirection ? -1 : 1) * -1
            }
            return -1
          })
          .slice(ITEMS_PER_INFO_TABLE_PAGE * (page - 1), page * ITEMS_PER_INFO_TABLE_PAGE)
      : []
  }, [page, poolDatas, sortDirection, sortField])

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
    },
    [sortDirection, sortField],
  )

  const arrow = useCallback(
    (field: string) => {
      const directionArrow = !sortDirection ? (
        <ExpandableButton direction="up" />
      ) : (
        <ExpandableButton direction="down" />
      )
      return sortField === field ? <Flex ml="8px">{directionArrow}</Flex> : ''
    },
    [sortDirection, sortField],
  )

  return (
    <InnerTableWrapper>
      <ResponsiveGrid>
        <Text color="primaryGray" fontSize="13px" bold>
          {t('Rank')}
        </Text>
        <Text color="primaryGray" fontSize="13px" bold>
          {t('Pool')}
        </Text>
        <ClickableColumnHeader
          color="primaryGray"
          fontSize="13px"
          bold
          onClick={() => handleSort(SORT_FIELD.volumeUSD)}
          // textTransform="uppercase"
        >
          {t('Volume 24H')} {arrow(SORT_FIELD.volumeUSD)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="primaryGray"
          fontSize="13px"
          bold
          onClick={() => handleSort(SORT_FIELD.volumeUSDWeek)}
          // textTransform="uppercase"
        >
          {t('Volume 7D')} {arrow(SORT_FIELD.volumeUSDWeek)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="primaryGray"
          fontSize="13px"
          bold
          onClick={() => handleSort(SORT_FIELD.lpFees24h)}
          // textTransform="uppercase"
        >
          {t('LP reward fees 24H')} {arrow(SORT_FIELD.lpFees24h)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="primaryGray"
          fontSize="13px"
          bold
          onClick={() => handleSort(SORT_FIELD.lpApr7d)}
          // textTransform="uppercase"
        >
          {t('LP reward APR')} {arrow(SORT_FIELD.lpApr7d)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="primaryGray"
          fontSize="13px"
          bold
          onClick={() => handleSort(SORT_FIELD.tvlUSD)}
          // textTransform="uppercase"
        >
          {t('Liquidity')} {arrow(SORT_FIELD.tvlUSD)}
        </ClickableColumnHeader>
      </ResponsiveGrid>

      {sortedPools.length > 0 ? (
        <>
          {sortedPools.map((poolData, i) => {
            if (poolData) {
              return (
                <React.Fragment key={poolData.address}>
                  <DataRow index={(page - 1) * ITEMS_PER_INFO_TABLE_PAGE + i} poolData={poolData} />
                  <Break />
                </React.Fragment>
              )
            }
            return null
          })}
          {loading && <LoadingRow />}
          <PageButtons>
            <Flex mx="8px">
              <ExpandableButton
                direction="left"
                onClick={() => {
                  setPage(page === 1 ? page : page - 1)
                }}
              />
            </Flex>

            <Text>{t('Page %page% of %maxPage%', { page, maxPage })}</Text>
            <Flex mx="8px">
              <ExpandableButton
                direction="right"
                onClick={() => {
                  setPage(page === maxPage ? page : page + 1)
                }}
              />
            </Flex>
          </PageButtons>
        </>
      ) : (
        <>
          <TableLoader />
          {/* spacer */}
          <Box />
        </>
      )}
    </InnerTableWrapper>
  )
}

export default PoolTable
