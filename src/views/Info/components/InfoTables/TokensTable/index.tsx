import React, { useState, useMemo, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, Skeleton, useMatchBreakpoints, ExpandableButton } from '@crosswise/uikit'
import { TokenData } from 'state/info/types'
import { Link } from 'react-router-dom'
import { CurrencyLogo } from 'views/Info/components/CurrencyLogo'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import Percent from 'views/Info/components/Percent'
import SaveIcon from 'views/Info/components/SaveIcon'
import { useTranslation } from 'contexts/Localization'
import { useWatchlistTokens } from 'state/user/hooks'
import { ClickableColumnHeader, InnerTableWrapper, PageButtons, Arrow, Break } from '../shared'
import { ResponsiveGrid, LinkWrapper, ResponsiveLogo } from './styled'

const TableLoader: React.FC = () => {
  const loadingRow = (
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
  return (
    <>
      {loadingRow}
      {loadingRow}
      {loadingRow}
    </>
  )
}

const DataRow: React.FC<{ tokenData: TokenData; index: number }> = ({ tokenData, index }) => {
  const { isXs, isSm } = useMatchBreakpoints()
  const [watchlistTokens, addWatchlistToken] = useWatchlistTokens()

  return (
    <LinkWrapper to={`/info/token/${tokenData.address}`}>
      <ResponsiveGrid>
        <Flex>
          <Text mr="8px">{index + 1}</Text>
          <SaveIcon
            fill={watchlistTokens.includes(tokenData.address)}
            onClick={() => addWatchlistToken(tokenData.address)}
          />
        </Flex>
        <Flex alignItems="center">
          <ResponsiveLogo address={tokenData.address} />
          {(isXs || isSm) && <Text ml="8px">{tokenData.symbol}</Text>}
          {!isXs && !isSm && (
            <Flex marginLeft="10px">
              <Text>{tokenData.name}</Text>
              <Text ml="8px">({tokenData.symbol})</Text>
            </Flex>
          )}
        </Flex>
        <Text fontWeight={400}>${formatAmount(tokenData.volumeUSD)}</Text>
        <Text fontWeight={400}>${formatAmount(tokenData.liquidityUSD)}</Text>
        <Text fontWeight={400}>${formatAmount(tokenData.priceUSD, { notation: 'standard' })}</Text>
        <Text fontWeight={400}>
          <Percent value={tokenData.priceUSDChange} fontWeight={400} />
        </Text>
        <Text fontWeight={400}>
          <Percent value={tokenData.priceUSDChangeWeek} fontWeight={400} />
        </Text>
      </ResponsiveGrid>
    </LinkWrapper>
  )
}

const SORT_FIELD = {
  name: 'name',
  volumeUSD: 'volumeUSD',
  tvlUSD: 'tvlUSD',
  priceUSD: 'priceUSD',
  priceUSDChange: 'priceUSDChange',
  priceUSDChangeWeek: 'priceUSDChangeWeek',
}

const MAX_ITEMS = 10

const TokenTable: React.FC<{
  tokenDatas: TokenData[] | undefined
  maxItems?: number
}> = ({ tokenDatas, maxItems = MAX_ITEMS }) => {
  const [sortField, setSortField] = useState(SORT_FIELD.volumeUSD)
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  const { t } = useTranslation()

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  useEffect(() => {
    let extraPages = 1
    if (tokenDatas) {
      if (tokenDatas.length % maxItems === 0) {
        extraPages = 0
      }
      setMaxPage(Math.floor(tokenDatas.length / maxItems) + extraPages)
    }
  }, [maxItems, tokenDatas])

  const sortedTokens = useMemo(() => {
    return tokenDatas
      ? tokenDatas
          .sort((a, b) => {
            if (a && b) {
              return a[sortField as keyof TokenData] > b[sortField as keyof TokenData]
                ? (sortDirection ? -1 : 1) * 1
                : (sortDirection ? -1 : 1) * -1
            }
            return -1
          })
          .slice(maxItems * (page - 1), page * maxItems)
      : []
  }, [tokenDatas, maxItems, page, sortDirection, sortField])

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

  if (!tokenDatas) {
    return <Skeleton />
  }

  return (
    <InnerTableWrapper>
      <ResponsiveGrid>
        <Text color="primaryGray" fontSize="13px" bold>
          {t('Rank')}
        </Text>
        <ClickableColumnHeader
          color="primaryGray"
          fontSize="13px"
          bold
          onClick={() => handleSort(SORT_FIELD.name)}
          // textTransform="uppercase"
        >
          {t('Token')} {arrow(SORT_FIELD.name)}
        </ClickableColumnHeader>
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
          onClick={() => handleSort(SORT_FIELD.tvlUSD)}
          // textTransform="uppercase"
        >
          {t('Liquidity')} {arrow(SORT_FIELD.tvlUSD)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="primaryGray"
          fontSize="13px"
          bold
          onClick={() => handleSort(SORT_FIELD.priceUSD)}
          // textTransform="uppercase"
        >
          {t('Price')} {arrow(SORT_FIELD.priceUSD)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="primaryGray"
          fontSize="13px"
          bold
          onClick={() => handleSort(SORT_FIELD.priceUSDChange)}
          // textTransform="uppercase"
        >
          {t('24 Hours')} {arrow(SORT_FIELD.priceUSDChange)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="primaryGray"
          fontSize="13px"
          bold
          onClick={() => handleSort(SORT_FIELD.priceUSDChangeWeek)}
          // textTransform="uppercase"
        >
          {t('7 Days')} {arrow(SORT_FIELD.priceUSDChangeWeek)}
        </ClickableColumnHeader>
      </ResponsiveGrid>

      {sortedTokens.length > 0 ? (
        <>
          {sortedTokens.map((data, i) => {
            if (data) {
              return (
                <React.Fragment key={data.address}>
                  <DataRow index={(page - 1) * MAX_ITEMS + i} tokenData={data} />
                  <Break />
                </React.Fragment>
              )
            }
            return null
          })}
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
          <Box />
        </>
      )}
    </InnerTableWrapper>
  )
}

export default TokenTable
