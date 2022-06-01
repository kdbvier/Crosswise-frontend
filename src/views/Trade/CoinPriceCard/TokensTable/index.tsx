import React, { useState, useMemo, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, Skeleton, useMatchBreakpoints, ExpandableButton } from '@crosswise/uikit'
import { TokenData } from 'state/info/types'
import { Link } from 'react-router-dom'
import { CurrencyLogo } from 'views/Info/components/CurrencyLogo'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import Percent from 'views/Info/components/Percent'
import { useTranslation } from 'contexts/Localization'
import { ClickableColumnHeader, TableWrapper, PageButtons, Arrow, Break } from '../styled'
import { ResponsiveGrid, LinkWrapper, ResponsiveLogo } from './styled'
import TokenInfo from '../TokenInfo'

const TableLoader: React.FC = () => {
  const loadingRow = (
    <ResponsiveGrid>
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
  return (
    // <LinkWrapper to={`/info/token/${tokenData.address}`}>
    <ResponsiveGrid>
      <Flex>
        <Text>{index + 1}</Text>
      </Flex>
      <Flex alignItems="center">
        <TokenInfo token={tokenData.name} />
        {/* <ResponsiveLogo address={tokenData.address} />
          {(isXs || isSm) && <Text ml="8px" fontSize='15px' fontWeight={600}>{tokenData.symbol}</Text>}
          {!isXs && !isSm && (
            <Flex marginLeft="10px">
              <Text>{tokenData.name}</Text>
              <Text ml="8px">({tokenData.symbol})</Text>
            </Flex>
          )} */}
      </Flex>
      <Text fontSize="15px" fontWeight={600}>
        ${formatAmount(tokenData.volumeUSD)}
      </Text>
      <Text fontSize="15px" fontWeight={600}>
        ${formatAmount(tokenData.priceUSD, { notation: 'standard' })}
      </Text>
      <Text fontSize="15px" fontWeight={600}>
        {tokenData.priceUSDChange}%{/* <Percent value={tokenData.priceUSDChange} fontSize='15px' fontWeight={600} /> */}
      </Text>
      <Text fontSize="15px" fontWeight={600}>
        {tokenData.priceUSDChangeWeek}%
        {/* <Percent value={tokenData.priceUSDChangeWeek} fontSize='15px' fontWeight={600} /> */}
      </Text>
    </ResponsiveGrid>
    // </LinkWrapper>
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

const TokenTable: React.FC<{
  tokenDatas: TokenData[] | undefined
}> = ({ tokenDatas }) => {
  const [sortField, setSortField] = useState<string>()
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  const { t } = useTranslation()

  const sortedTokens = useMemo(() => {
    return tokenDatas
      ? sortField
        ? tokenDatas.sort((a, b) => {
            if (a && b) {
              return a[sortField as keyof TokenData] > b[sortField as keyof TokenData]
                ? (sortDirection ? -1 : 1) * 1
                : (sortDirection ? -1 : 1) * -1
            }
            return -1
          })
        : tokenDatas
      : []
  }, [tokenDatas, sortDirection, sortField])

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
    <TableWrapper>
      <ResponsiveGrid>
        <Text color="primaryGray" padding="1rem 0" fontSize="13px" fontWeight={600}>
          {t('Rank')}
        </Text>
        <ClickableColumnHeader
          fontSize="13px"
          bold
          onClick={() => handleSort(SORT_FIELD.name)}
          textTransform="uppercase"
        >
          {t('Token')} {arrow(SORT_FIELD.name)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          fontSize="13px"
          onClick={() => handleSort(SORT_FIELD.volumeUSD)}
          textTransform="uppercase"
        >
          {t('Volume 24H')} {arrow(SORT_FIELD.volumeUSD)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          fontSize="13px"
          onClick={() => handleSort(SORT_FIELD.priceUSD)}
          textTransform="uppercase"
        >
          {t('Price')} {arrow(SORT_FIELD.priceUSD)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          fontSize="13px"
          onClick={() => handleSort(SORT_FIELD.priceUSDChange)}
          textTransform="uppercase"
        >
          {t('24 Hours')} {arrow(SORT_FIELD.priceUSDChange)}
        </ClickableColumnHeader>
        <ClickableColumnHeader fontSize="13px" onClick={() => handleSort(SORT_FIELD.tvlUSD)} textTransform="uppercase">
          {t('7 Days')} {arrow(SORT_FIELD.tvlUSD)}
        </ClickableColumnHeader>
      </ResponsiveGrid>

      {sortedTokens.length > 0 ? (
        <>
          {sortedTokens.map((data, i) => {
            if (data) {
              return (
                <React.Fragment key={data.address}>
                  <DataRow index={i} tokenData={data} />
                </React.Fragment>
              )
            }
            return null
          })}
        </>
      ) : (
        <>
          <TableLoader />
          <Box />
        </>
      )}
    </TableWrapper>
  )
}

export default TokenTable
