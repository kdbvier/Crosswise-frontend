import React from 'react'
import { ColumnType, LinkExternal, useTable } from '@crosswise/uikit'
// import { useTranslation } from 'contexts/Localization'
// import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getBscScanLink } from 'utils'
import { TradeNowColumnSchema } from '../types'
import { TableContainer, StyledTable, TableHeader, TableBody } from './styled'

export type Token = {
  symbol: string
  address: string
}

export interface RowProps {
  isBuy: boolean
  tradeFrom: Token
  amountFrom: number
  tradeTo: Token
  amountTo: number
  txDate: string
  txLink: string
}

export interface TableProps {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
  sortColumn?: string
}

const Row = ({ tradeFrom, amountFrom, tradeTo, amountTo, txDate, txLink }: RowProps) => {
  // const { chainId } = useActiveWeb3React()

  return (
    <tr>
      <td>{tradeFrom.symbol}</td>
      <td>{amountFrom.toFixed(2)}</td>
      <td>{tradeTo.symbol}</td>
      <td>{amountTo.toFixed(2)}</td>
      <td>{txDate.toString()}</td>
      <td>
        <LinkExternal href={getBscScanLink(txLink, 'transaction')}>View on BscScan</LinkExternal>
      </td>
    </tr>
  )
}

const TradeNowTable = ({ data, columns }: TableProps) => {
  // const { t } = useTranslation()
  const { rows } = useTable(columns, data, { sortable: false, sortColumn: 'txDate' })

  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <tr>
            {columns.map((column) => {
              const schema = TradeNowColumnSchema.find((colSchema) => colSchema.name === column.name)
              return (
                <th key={`${schema.id}th`} style={{ width: schema.width }}>
                  {schema.label ?? column.label}
                </th>
              )
            })}
          </tr>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            return <Row {...row.original} key={`table-row-${row.id}`} />
          })}
        </TableBody>
      </StyledTable>
    </TableContainer>
  )
}

export default TradeNowTable
