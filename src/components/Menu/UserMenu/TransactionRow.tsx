import React from 'react'
import { BlockIcon, CheckmarkCircleIcon, OpenNewIcon, RefreshIcon } from '@crosswise/uikit'
import { TransactionDetails } from 'state/transactions/reducer'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getBscScanLink } from 'utils'
import { TransactionRowProps } from './interfaces'
import { IconLinkTo } from '../../SvgIcons'
import { TxnIcon, Summary, TxnLink } from './styled'

const renderIcon = (txn: TransactionDetails) => {
  if (!txn.receipt) {
    return <RefreshIcon spin width="24px" />
  }

  return txn.receipt?.status === 1 || typeof txn.receipt?.status === 'undefined' ? (
    <CheckmarkCircleIcon color="success" width="24px" />
  ) : (
    <BlockIcon color="failure" width="24px" />
  )
}

const TransactionRow: React.FC<TransactionRowProps> = ({ txn }) => {
  const { chainId } = useActiveWeb3React()

  if (!txn) {
    return null
  }

  return (
    <TxnLink href={getBscScanLink(txn.hash, 'transaction', chainId)} external>
      <TxnIcon>{renderIcon(txn)}</TxnIcon>
      <Summary>{txn.summary ?? txn.hash}</Summary>
      <TxnIcon>
        <IconLinkTo />
      </TxnIcon>
    </TxnLink>
  )
}

export default TransactionRow
