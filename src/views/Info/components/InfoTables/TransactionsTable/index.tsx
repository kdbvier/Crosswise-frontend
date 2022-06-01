// TODO PCS refactor ternaries
/* eslint-disable no-nested-ternary */
import React, { useCallback, useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { formatDistanceToNowStrict } from 'date-fns'
import { Text, Flex, Box, Radio, Skeleton, LinkExternal, TabMenu, Tab, ExpandableButton } from '@crosswise/uikit'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import { getBscScanLink } from 'utils'
import truncateHash from 'utils/truncateHash'
import { Transaction, TransactionType } from 'state/info/types'
import { ITEMS_PER_INFO_TABLE_PAGE } from 'config/constants/info'
import { useTranslation } from 'contexts/Localization'
import { ClickableColumnHeader, TableWrapper, PageButtons, Arrow, Break } from '../shared'
import { Wrapper, ResponsiveGrid, TabMenuWrapper } from './styled'

const SORT_FIELD = {
  amountUSD: 'amountUSD',
  timestamp: 'timestamp',
  sender: 'sender',
  amountToken0: 'amountToken0',
  amountToken1: 'amountToken1',
}

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

const DataRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const { t } = useTranslation()
  const abs0 = Math.abs(transaction.amountToken0)
  const abs1 = Math.abs(transaction.amountToken1)
  const outputTokenSymbol = transaction.amountToken0 < 0 ? transaction.token0Symbol : transaction.token1Symbol
  const inputTokenSymbol = transaction.amountToken1 < 0 ? transaction.token0Symbol : transaction.token1Symbol

  return (
    <ResponsiveGrid>
      <LinkExternal href={getBscScanLink(transaction.hash, 'transaction')}>
        {transaction.type === TransactionType.MINT
          ? t('Add %token0% and %token1%', { token0: transaction.token0Symbol, token1: transaction.token1Symbol })
          : transaction.type === TransactionType.SWAP
          ? t('Swap %token0% for %token1%', { token0: inputTokenSymbol, token1: outputTokenSymbol })
          : t('Remove %token0% and %token1%', { token0: transaction.token0Symbol, token1: transaction.token1Symbol })}
      </LinkExternal>
      <Text>${formatAmount(transaction.amountUSD)}</Text>
      <Text>
        <Text>{`${formatAmount(abs0)} ${transaction.token0Symbol}`}</Text>
      </Text>
      <Text>
        <Text>{`${formatAmount(abs1)} ${transaction.token1Symbol}`}</Text>
      </Text>
      <LinkExternal href={getBscScanLink(transaction.sender, 'address')}>
        {truncateHash(transaction.sender)}
      </LinkExternal>
      <Text>{formatDistanceToNowStrict(parseInt(transaction.timestamp, 10) * 1000)}</Text>
    </ResponsiveGrid>
  )
}

const TransactionTable: React.FC<{
  transactions: Transaction[]
}> = ({ transactions }) => {
  const [sortField, setSortField] = useState(SORT_FIELD.timestamp)
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  const { t } = useTranslation()

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const [tabIndex, setTabIndex] = useState(0)
  const [txFilter, setTxFilter] = useState<TransactionType | undefined>(undefined)

  const sortedTransactions = useMemo(() => {
    return transactions
      ? transactions
          .slice()
          .sort((a, b) => {
            if (a && b) {
              return a[sortField as keyof Transaction] > b[sortField as keyof Transaction]
                ? (sortDirection ? -1 : 1) * 1
                : (sortDirection ? -1 : 1) * -1
            }
            return -1
          })
          .filter((x) => {
            return txFilter === undefined || x.type === txFilter
          })
          .slice(ITEMS_PER_INFO_TABLE_PAGE * (page - 1), page * ITEMS_PER_INFO_TABLE_PAGE)
      : []
  }, [transactions, page, sortField, sortDirection, txFilter])

  // Update maxPage based on amount of items & applied filtering
  useEffect(() => {
    if (transactions) {
      const filteredTransactions = transactions.filter((tx) => {
        return txFilter === undefined || tx.type === txFilter
      })
      if (filteredTransactions.length % ITEMS_PER_INFO_TABLE_PAGE === 0) {
        setMaxPage(Math.floor(filteredTransactions.length / ITEMS_PER_INFO_TABLE_PAGE))
      } else {
        setMaxPage(Math.floor(filteredTransactions.length / ITEMS_PER_INFO_TABLE_PAGE) + 1)
      }
    }
  }, [transactions, txFilter])

  const handleFilter = useCallback(
    (newFilter: TransactionType) => {
      if (newFilter !== txFilter) {
        setTxFilter(newFilter)
        setPage(1)
      }
    },
    [txFilter],
  )

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

  const handleTabClick = (idx: number) => {
    setTabIndex(idx)
    if (idx === 0) {
      handleFilter(undefined)
    } else if (idx === 1) {
      handleFilter(TransactionType.SWAP)
    } else if (idx === 2) {
      handleFilter(TransactionType.MINT)
    } else if (idx === 3) {
      handleFilter(TransactionType.BURN)
    }
  }

  return (
    <Wrapper>
      <TabMenuWrapper>
        <TabMenu activeIndex={tabIndex} variant="primaryGradient" onItemClick={handleTabClick} fullWidth>
          <Tab>{t('All')}</Tab>
          <Tab>{t('Swaps')}</Tab>
          <Tab>{t('Adds')}</Tab>
          <Tab>{t('Removes')}</Tab>
        </TabMenu>
      </TabMenuWrapper>
      <TableWrapper>
        <ResponsiveGrid>
          <Text color="primaryGray" fontSize="13px" bold>
            {t('Action')}
          </Text>
          <ClickableColumnHeader
            color="primaryGray"
            fontSize="13px"
            bold
            onClick={() => handleSort(SORT_FIELD.amountUSD)}
            // textTransform="uppercase"
          >
            {t('Total Value')} {arrow(SORT_FIELD.amountUSD)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="primaryGray"
            fontSize="13px"
            bold
            onClick={() => handleSort(SORT_FIELD.amountToken0)}
            // textTransform="uppercase"
          >
            {t('Token Amount')} {arrow(SORT_FIELD.amountToken0)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="primaryGray"
            fontSize="13px"
            bold
            onClick={() => handleSort(SORT_FIELD.amountToken1)}
            // textTransform="uppercase"
          >
            {t('Token Amount')} {arrow(SORT_FIELD.amountToken1)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="primaryGray"
            fontSize="13px"
            bold
            onClick={() => handleSort(SORT_FIELD.sender)}
            // textTransform="uppercase"
          >
            {t('Account')} {arrow(SORT_FIELD.sender)}
          </ClickableColumnHeader>
          <ClickableColumnHeader
            color="primaryGray"
            fontSize="13px"
            bold
            onClick={() => handleSort(SORT_FIELD.timestamp)}
            // textTransform="uppercase"
          >
            {t('Time')} {arrow(SORT_FIELD.timestamp)}
          </ClickableColumnHeader>
        </ResponsiveGrid>
        <Break />

        {transactions ? (
          <>
            {sortedTransactions.map((transaction, index) => {
              if (transaction) {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <React.Fragment key={index}>
                    <DataRow transaction={transaction} />
                    <Break />
                  </React.Fragment>
                )
              }
              return null
            })}
            {sortedTransactions.length === 0 ? (
              <Flex justifyContent="center">
                <Text>{t('No Transactions')}</Text>
              </Flex>
            ) : undefined}
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
      </TableWrapper>
    </Wrapper>
  )
}

export default TransactionTable
